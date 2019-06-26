import {
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'
import { CreateTaskListDto } from './dtos/create-task-list.dto'
import { TaskListIdDto } from './dtos/task-list-id.dto'
import { TaskIdDto } from './dtos/task-id.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { IRoom } from './entities/room.interface'
import { ITaskList } from './entities/task-list.interface'
import { ITask } from './entities/task.interface'
import { Room } from './entities/room.entity'
import { TaskList } from './entities/task-list.entity'
import { Task } from './entities/task.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<IRoom>,
    @InjectModel('TaskList') private readonly taskListModel: Model<ITaskList>,
    @InjectModel('Task') private readonly taskModel: Model<ITask>
  ) {}

  public async fetchRooms(): Promise<Room[]> {
    const rooms = await this.roomModel.find()
    if (!rooms.length) {
      throw new NotFoundException('No rooms found.')
    }
    // @todo add builder
    return rooms
  }

  public async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      const roomModel = new this.roomModel(createRoomDto)
      return roomModel.save()
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
    // @todo add builder
    return room
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

  public async createTaskList(
    roomIdDto: RoomIdDto,
    createTaskListDto: CreateTaskListDto
  ): Promise<Room> {
    try {
      // @todo findOneAndUpdate return the new Object ?
      const room = this.roomModel.findOneAndUpdate(
        { _id: roomIdDto },
        {
          // @todo not sure it is good
          $push: { tasksLists: createTaskListDto }
        }
      )
      // @todo add builder
      return room
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async fetchTaskList(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto
  ): Promise<TaskList> {
    const room = await this.roomModel.findOneAndUpdate({
      _id: roomIdDto,
      'tasksLists._id': taskListIdDto.taskListId
    })
    const taskList = room.tasksLists[0]
    if (!taskList) {
      throw new NotFoundException(
        `Task list from taskListId ${taskListIdDto.taskListId} not found.`
      )
    }
    // @todo add builder
    return taskList
  }

  public async deleteTaskList(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto
  ): Promise<void> {
    try {
      await this.roomModel.findOneAndRemove({
        _id: roomIdDto,
        'tasksLists._id': taskListIdDto.taskListId
      })
    } catch (err) {
      throw new InternalServerErrorException('Task list not deleted.')
    }
  }

  public async createTask(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto,
    createTaskDto: CreateTaskDto
  ): Promise<Room> {
    try {
      // @todo findOneAndUpdate return the new Object ?
      const room = await this.roomModel.findOneAndUpdate(
        { _id: roomIdDto, 'tasksLists._id': taskListIdDto.taskListId },
        {
          // @todo not sure it is good
          $push: { tasks: createTaskDto }
        }
      )
      // @todo add builder
      return room
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async deleteTask(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto,
    taskIdDto: TaskIdDto
  ): Promise<void> {
    try {
      await this.roomModel.findOneAndRemove({
        _id: roomIdDto,
        'tasksLists._id': taskListIdDto.taskListId,
        'tasks._id': taskIdDto.taskId
      })
    } catch (err) {
      throw new InternalServerErrorException('Task list not deleted.')
    }
  }
}
