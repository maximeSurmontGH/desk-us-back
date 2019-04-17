import { Injectable } from '@nestjs/common'

import { CreateTaskListDto } from './dtos/create-task-list.dto'
import { UpdateTaskListDto } from './dtos/update-task-list.dto'
import { RoomIdDto } from 'src/rooms/dtos/room-id.dto'
import { TaskListIdDto } from './dtos/task-list-id.dto'

@Injectable()
export class TasksListsService {
  public createTaskList(
    roomId: RoomIdDto,
    createTaskListDto: CreateTaskListDto,
  ) {
    return 'create a new task list'
  }

  getTaskList(roomId: RoomIdDto, taskListId: TaskListIdDto) {
    return `all tasks from taks list ${taskListId}`
  }

  updateTaskList(
    roomId: RoomIdDto,
    taskListId: TaskListIdDto,
    pdateTaskListDto: UpdateTaskListDto,
  ) {
    return `update task list ${taskListId}`
  }

  deleteTaskList(roomId: RoomIdDto, taskListId: TaskListIdDto) {
    return `delete task list ${taskListId}`
  }
}
