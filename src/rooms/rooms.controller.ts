import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
} from '@nestjs/common'

import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter'

import { RoomsService } from './rooms.service'
import { TasksListsService } from '../tasks-lists/tasks-lists.service'
import { TasksService } from '../tasks/tasks.service'

import { CreateTaskListDto } from '../tasks-lists/dtos/create-task-list.dto'
import { CreateTaskDto } from '../tasks/dtos/create-task.dto'
import { CreateRoomDto } from './dtos/create-room.dto'
import { UpdateTaskListDto } from '../tasks-lists/dtos/update-task-list.dto'
import { UpdateTaskDto } from '../tasks/dtos/update-task.dto'
import { UpdateRoomDto } from './dtos/update-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'
import { TaskListIdDto } from 'src/tasks-lists/dtos/task-list-id.dto'
import { TaskIdDto } from 'src/tasks/dtos/task-id.dto'

@Controller('rooms')
@UseFilters(HttpExceptionFilter)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly tasksListsService: TasksListsService,
    private readonly tasksService: TasksService,
  ) {}

  @Get('')
  getRooms() {
    return this.roomsService.getRooms()
  }

  @Post('')
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto)
  }

  @Get('/:roomId')
  getRoom(@Param('roomId') roomId: RoomIdDto) {
    return this.roomsService.getRoom(roomId)
  }

  @Put('/:roomId')
  updateRoom(
    @Param('roomId') roomId: RoomIdDto,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.updateRoom(roomId, updateRoomDto)
  }

  @Delete('/:roomId')
  deleteRoom(@Param('roomId') roomId: RoomIdDto) {
    return this.roomsService.deleteRoom(roomId)
  }

  @Post('/:roomId')
  createTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Body() createTaskListDto: CreateTaskListDto,
  ) {
    return this.tasksListsService.createTaskList(roomId, createTaskListDto)
  }

  @Get('/:roomId/:taskListId')
  getTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
  ) {
    return this.tasksListsService.getTaskList(roomId, taskListId)
  }

  @Put('/:roomId/:taskListId')
  updateTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
    @Body() updateTaskListDto: UpdateTaskListDto,
  ) {
    return this.tasksListsService.updateTaskList(
      roomId,
      taskListId,
      updateTaskListDto,
    )
  }

  @Delete('/:roomId/:taskListId')
  deleteTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
  ) {
    return this.tasksListsService.deleteTaskList(roomId, taskListId)
  }

  @Post('/:roomId/:taskListId')
  createTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(roomId, taskListId, createTaskDto)
  }

  @Get('/:roomId/:taskListId/:taskId')
  getTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskId') taskListId: TaskListIdDto,
    @Param('taskId') taskId: TaskIdDto,
  ) {
    return this.tasksService.getTask(roomId, taskListId, taskId)
  }

  @Put('/:roomId/:taskListId/:taskId')
  updateTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskId') taskListId: TaskListIdDto,
    @Param('taskId') taskId: TaskIdDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(
      roomId,
      taskListId,
      taskId,
      updateTaskDto,
    )
  }

  @Delete('/:roomId/:taskListId/:taskId')
  deleteTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskId') taskListId: TaskListIdDto,
    @Param('taskId') taskId: TaskIdDto,
  ) {
    return this.tasksService.deleteTask(roomId, taskListId, taskId)
  }
}
