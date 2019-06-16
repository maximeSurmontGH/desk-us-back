import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'
import { CreateTaskListDto } from './dtos/create-task-list.dto'
import { TaskListIdDto } from './dtos/task-list-id.dto'
import { TaskIdDto } from './dtos/task-id.dto'
import { CreateTaskDto } from './dtos/create-task.dto'

import { Room } from './entities/room.entity'
import { TaskList } from './entities/task-list.entity'
import { Task } from './entities/task.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<Room>,
    @InjectModel('Task') private readonly taskListModel: Model<TaskList>,
    @InjectModel('Task') private readonly taskModel: Model<Task>
  ) {}

  public async fetchRooms() {
    const roomsFetched = await this.roomModel.find()
    if (!roomsFetched.length) {
      throw new NotFoundException('No rooms found.')
    }
    return roomsFetched
  }

  public async createRoom(createRoomDto: CreateRoomDto) {
    try {
      const roomToCreate = new this.roomModel(createRoomDto)
      return await roomToCreate.save()
    } catch (err) {
      throw new BadRequestException('New room not saved.')
    }
  }

  public async fetchRoom(roomId: RoomIdDto) {
    const roomFetched = await this.roomModel.find({ roomId: roomId })
    if (!roomFetched) {
      throw new NotFoundException(`Room from roomId ${roomId} not found.`)
    }
    return roomFetched
  }

  public deleteRoom(roomId: RoomIdDto) {
    return `delete room ${roomId}`
  }

  public createTaskList(
    roomIdDto: RoomIdDto,
    createTaskListDto: CreateTaskListDto
  ) {
    return 'create a new room'
  }

  public fetchTaskList(roomId: RoomIdDto, taskListId: TaskListIdDto) {
    return `all tasks from taks list ${taskListId}`
  }

  public deleteTaskList(roomId: RoomIdDto, taskListId: TaskListIdDto) {
    return `delete task list ${taskListId}`
  }

  public createTask(
    roomId: RoomIdDto,
    taskListId: TaskListIdDto,
    createTaskDto: CreateTaskDto
  ) {
    return 'create a new room'
  }

  public fetchTask(
    roomId: RoomIdDto,
    taskListId: TaskListIdDto,
    taskId: TaskIdDto
  ) {
    return `task ${taskId}`
  }

  public deleteTask(
    roomId: RoomIdDto,
    taskListId: TaskListIdDto,
    taskId: TaskIdDto
  ) {
    return `delete task ${taskId}`
  }
}
