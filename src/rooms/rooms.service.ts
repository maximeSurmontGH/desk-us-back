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

  public async fetchRooms(): Promise<Room[]> {
    const rooms = await this.roomModel.find()
    if (!rooms.length) {
      throw new NotFoundException('No rooms found.')
    }
    // @todo add builder
    return rooms
  }

  public async createRoom(createRoomDto: CreateRoomDto): Promise<void> {
    try {
      const room = new this.roomModel(createRoomDto)
      return room.save()
    } catch (err) {
      throw new InternalServerErrorException('New room not saved.')
    }
  }

  public async fetchRoom(roomIdDto: RoomIdDto): Promise<Room> {
    const room = await this.roomModel.find(roomIdDto)
    if (!room) {
      throw new NotFoundException(
        `Room from roomId ${roomIdDto.roomId} not found.`
      )
    }
    // @todo add builder
    return room
  }

  public async deleteRoom(roomIdDto: RoomIdDto): Promise<void> {
    const deleteResult = this.roomModel.findOneAndDelete(roomIdDto)
    if (!deleteResult) {
      throw new NotFoundException(
        `Room from rommId ${roomIdDto.roomId} not found.`
      )
    }
  }

  public async createTaskList(
    roomIdDto: RoomIdDto,
    createTaskListDto: CreateTaskListDto
  ): Promise<void> {
    try {
      const taskList = new this.taskListModel(createTaskListDto)
      await taskList.save()
      const room = await this.fetchRoom(roomIdDto)
      room.tasks.push()
      room.save()
    } catch (err) {
      throw new InternalServerErrorException('New task list not saved.')
    }
  }

  public async fetchTaskList(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto
  ) {
    const taskListFetched = await this.taskListModel.find(taskListIdDto)
    if (!taskListFetched) {
      throw new NotFoundException(
        `Task list from taskListId ${taskListIdDto.taskListId} not found.`
      )
    }
    return taskListFetched
  }

  public async deleteTaskList(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto
  ) {
    const deleteResult = await this.taskListModel.findOneAndDelete(
      taskListIdDto
    )
    if (!deleteResult) {
      throw new NotFoundException(
        `Task list from askListId ${taskListIdDto.taskListId} not found.`
      )
    }
  }

  public async createTask(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto,
    createTaskDto: CreateTaskDto
  ) {
    try {
      const taskToCreate = new this.taskModel(createTaskDto)
      await taskToCreate.save()
      // update task list
    } catch (err) {
      throw new InternalServerErrorException('New task not saved.')
    }
  }

  public async fetchTask(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto,
    taskIdDto: TaskIdDto
  ) {
    const taskFetched = await this.taskModel.find(taskIdDto)
    if (!taskFetched) {
      throw new NotFoundException(
        `Task from taskId ${taskIdDto.taskId} not found.`
      )
    }
    return taskFetched
  }

  public async deleteTask(
    roomIdDto: RoomIdDto,
    taskListIdDto: TaskListIdDto,
    taskIdDto: TaskIdDto
  ) {
    const deleteResult = await this.taskModel.findOneAndDelete(taskIdDto)
    if (!deleteResult) {
      throw new NotFoundException(
        `Task list from taskId ${taskIdDto.taskId} not found.`
      )
    }
  }
}
