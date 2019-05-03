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

import { CreateTaskListDto } from './dtos/create-task-list.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'
import { TaskListIdDto } from './dtos/task-list-id.dto'
import { TaskIdDto } from './dtos/task-id.dto'

@Controller('rooms')
@UseFilters(HttpExceptionFilter)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
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

  @Delete('/:roomId')
  deleteRoom(@Param('roomId') roomId: RoomIdDto) {
    return this.roomsService.deleteRoom(roomId)
  }

  @Post('/:roomId')
  createTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Body() createTaskListDto: CreateTaskListDto,
  ) {
    return this.roomsService.createTaskList(roomId, createTaskListDto)
  }

  @Get('/:roomId/:taskListId')
  getTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
  ) {
    return this.roomsService.getTaskList(roomId, taskListId)
  }

  @Delete('/:roomId/:taskListId')
  deleteTaskList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
  ) {
    return this.roomsService.deleteTaskList(roomId, taskListId)
  }

  @Post('/:roomId/:taskListId')
  createTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskListId') taskListId: TaskListIdDto,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.roomsService.createTask(roomId, taskListId, createTaskDto)
  }

  @Get('/:roomId/:taskListId/:taskId')
  getTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskId') taskListId: TaskListIdDto,
    @Param('taskId') taskId: TaskIdDto,
  ) {
    return this.roomsService.getTask(roomId, taskListId, taskId)
  }

  @Delete('/:roomId/:taskListId/:taskId')
  deleteTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskId') taskListId: TaskListIdDto,
    @Param('taskId') taskId: TaskIdDto,
  ) {
    return this.roomsService.deleteTask(roomId, taskListId, taskId)
  }
}
