import {
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateRoomDto } from './dtos/create-room.dto'
import { CreateTasksListDto } from './dtos/create-task-list.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { IRoom } from './schemas/room.interface'
import { ITasksList } from './schemas/tasks-list.interface'
import { ITask } from './schemas/task.interface'
import { Room } from './entities/room.entity'
import { TasksList } from './entities/tasks-list.entity'
import { RoomBuilder } from './entities/room.builder'
import { TasksListBuilder } from './entities/tasks-list.builder'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<IRoom>,
    @InjectModel('TasksList')
    private readonly tasksListModel: Model<ITasksList>,
    @InjectModel('Task') private readonly taskModel: Model<ITask>
  ) {}

  public async fetchRooms(): Promise<Room[]> {
    const rooms = await this.roomModel.find()
    if (!rooms.length) {
      throw new NotFoundException('No rooms found.')
    }
    return rooms.map(room =>
      RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    )
  }

  public async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      const roomModel = new this.roomModel(createRoomDto)
      const room = await roomModel.save()
      return RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New room not saved.')
    }
  }

  public async fetchRoom(roomId: string): Promise<Room> {
    const room = await this.roomModel.findOne({ _id: roomId })
    if (!room) {
      throw new NotFoundException(`Room from roomId ${roomId} not found.`)
    }
    return RoomBuilder.aRoom()
      .fromSchemaResponse(room)
      .build()
  }

  public async deleteRoom(roomId: string): Promise<void> {
    try {
      await this.roomModel.findOneAndDelete({
        _id: roomId
      })
    } catch (err) {
      throw new InternalServerErrorException('Room not deleted.')
    }
  }

  public async createTasksList(
    roomId: string,
    createTasksListDto: CreateTasksListDto
  ): Promise<Room> {
    try {
      const room = await this.roomModel.findOneAndUpdate(
        { _id: roomId },
        {
          $push: { tasksLists: createTasksListDto }
        },
        { new: true }
      )

      return RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async fetchTasksList(
    roomId: string,
    tasksListId: string
  ): Promise<TasksList> {
    const room = await this.roomModel.findOne({ _id: roomId })
    const tasksList = room.tasksLists.id(tasksListId)
    if (!tasksList) {
      throw new NotFoundException(
        `Task list from tasksListId ${tasksListId} not found.`
      )
    }
    return TasksListBuilder.aTasksList()
      .fromSchemaResponse(tasksList)
      .build()
  }

  public async deleteTasksList(
    roomId: string,
    tasksListId: string
  ): Promise<void> {
    try {
      await this.roomModel.findOneAndUpdate(
        { _id: roomId },
        {
          $pull: {
            tasksLists: {
              _id: tasksListId
            }
          }
        }
      )
    } catch (err) {
      throw new InternalServerErrorException('Task list not deleted.')
    }
  }

  public async createTask(
    roomId: string,
    tasksListId: string,
    createTaskDto: CreateTaskDto
  ): Promise<Room> {
    try {
      const room = await this.roomModel.findOneAndUpdate(
        { _id: roomId, 'tasksLists._id': tasksListId },
        {
          $push: { 'tasksLists.$.tasks': createTaskDto }
        },
        { new: true }
      )
      return RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async deleteTask(
    roomId: string,
    tasksListId: string,
    taskId: string
  ): Promise<void> {
    try {
      const res = await this.roomModel.findOneAndUpdate(
        { _id: roomId, 'tasksLists._id': tasksListId },
        {
          $pull: {
            'tasksLists.$.tasks': {
              _id: taskId
            }
          }
        }
      )
    } catch (err) {
      throw new InternalServerErrorException('Task list not deleted.')
    }
  }
}
