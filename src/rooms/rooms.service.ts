import {
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'
import { CreateTasksListDto } from './dtos/create-task-list.dto'
import { TasksListIdDto } from './dtos/task-list-id.dto'
import { TaskIdDto } from './dtos/task-id.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { IRoom } from './schemas/room.interface'
import { ITasksList } from './schemas/tasks-list.interface'
import { ITask } from './schemas/task.interface'
import { Room } from './entities/room.entity'
import { TasksList } from './entities/tasks-list.entity'
import { Task } from './entities/task.entity'
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
      // nw or old obj returned ?
      const room = roomModel.save()
      return RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New room not saved.')
    }
  }

  public async fetchRoom(roomIdDto: RoomIdDto): Promise<Room> {
    const room = await this.roomModel.find({ _id: roomIdDto.roomId })
    if (!room) {
      throw new NotFoundException(
        `Room from roomId ${roomIdDto.roomId} not found.`
      )
    }
    return RoomBuilder.aRoom()
      .fromSchemaResponse(room)
      .build()
  }

  public async deleteRoom(roomIdDto: RoomIdDto): Promise<void> {
    try {
      await this.roomModel.findOneAndDelete({
        _id: roomIdDto
      })
    } catch (err) {
      throw new InternalServerErrorException('Room not deleted.')
    }
  }

  public async createTasksList(
    roomIdDto: RoomIdDto,
    createTasksListDto: CreateTasksListDto
  ): Promise<Room> {
    try {
      // @todo findOneAndUpdate return the new Object ?
      const room = this.roomModel.findOneAndUpdate(
        { _id: roomIdDto },
        {
          // @todo not sure it is good
          $push: { tasksLists: createTasksListDto }
        }
      )
      return RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async fetchTasksList(
    roomIdDto: RoomIdDto,
    tasksListIdDto: TasksListIdDto
  ): Promise<TasksList> {
    // @todo room or takslist?
    const room = await this.roomModel.findOneAndUpdate({
      _id: roomIdDto,
      'tasksLists._id': tasksListIdDto.tasksListId
    })
    const tasksList = room.tasksLists[0]
    if (!tasksList) {
      throw new NotFoundException(
        `Task list from tasksListId ${tasksListIdDto.tasksListId} not found.`
      )
    }
    return TasksListBuilder.aTasksList()
      .fromSchemaResponse(tasksList)
      .build()
  }

  public async deleteTasksList(
    roomIdDto: RoomIdDto,
    tasksListIdDto: TasksListIdDto
  ): Promise<void> {
    // @todo remove all the doc or only the subdoc ?
    try {
      await this.roomModel.findOneAndRemove({
        _id: roomIdDto,
        'tasksLists._id': tasksListIdDto.tasksListId
      })
    } catch (err) {
      throw new InternalServerErrorException('Task list not deleted.')
    }
  }

  public async createTask(
    roomIdDto: RoomIdDto,
    tasksListIdDto: TasksListIdDto,
    createTaskDto: CreateTaskDto
  ): Promise<Room> {
    try {
      // @todo findOneAndUpdate return the new Object ?
      const room = await this.roomModel.findOneAndUpdate(
        { _id: roomIdDto, 'tasksLists._id': tasksListIdDto.tasksListId },
        {
          // @todo not sure it is good
          $push: { tasks: createTaskDto }
        }
      )
      return RoomBuilder.aRoom()
        .fromSchemaResponse(room)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async deleteTask(
    roomIdDto: RoomIdDto,
    tasksListIdDto: TasksListIdDto,
    taskIdDto: TaskIdDto
  ): Promise<void> {
    try {
      // @todo remove all the doc or only the subdoc ?
      await this.roomModel.findOneAndRemove({
        _id: roomIdDto,
        'tasksLists._id': tasksListIdDto.tasksListId,
        'tasks._id': taskIdDto.taskId
      })
    } catch (err) {
      throw new InternalServerErrorException('Task list not deleted.')
    }
  }
}
