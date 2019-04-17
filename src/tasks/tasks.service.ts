import { Injectable } from '@nestjs/common'

import { CreateTaskDto } from './dtos/create-task.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'
import { RoomIdDto } from 'src/rooms/dtos/room-id.dto'
import { TaskListIdDto } from 'src/tasks-lists/dtos/task-list-id.dto'
import { TaskIdDto } from './dtos/task-id.dto'

@Injectable()
export class TasksService {
  createTask(
    roomId: RoomIdDto,
    taskListId: TaskListIdDto,
    createTaskDto: CreateTaskDto,
  ) {
    return `create a new task added to task list ${taskListId}`
  }

  getTask(roomId: RoomIdDto, taskListId: TaskListIdDto, taskId: TaskIdDto) {
    return `task ${taskId}`
  }

  updateTask(
    roomId: RoomIdDto,
    taskListId: TaskListIdDto,
    taskId: TaskIdDto,
    updateTaskDto: UpdateTaskDto,
  ) {
    return `update task ${taskId}`
  }

  deleteTask(roomId: RoomIdDto, taskListId: TaskListIdDto, taskId: TaskIdDto) {
    return `delete task ${taskId}`
  }
}
