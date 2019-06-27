import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseFilters
} from '@nestjs/common'

import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter'

import { RoomsService } from './rooms.service'

import { CreateTasksListDto } from './dtos/create-task-list.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'
import { TasksListIdDto } from './dtos/task-list-id.dto'
import { TaskIdDto } from './dtos/task-id.dto'

@Controller('rooms')
@UseFilters(HttpExceptionFilter)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('')
  fetchRooms() {
    return this.roomsService.fetchRooms()
  }

  @Post('')
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto)
  }

  @Get('/:roomId')
  fetchRoom(@Param('roomId') roomId: RoomIdDto) {
    return this.roomsService.fetchRoom(roomId)
  }

  @Delete('/:roomId')
  deleteRoom(@Param('roomId') roomId: RoomIdDto) {
    return this.roomsService.deleteRoom(roomId)
  }

  @Post('/:roomId/tasksLists')
  createTasksList(
    @Param('roomId') roomId: RoomIdDto,
    @Body() createTasksListDto: CreateTasksListDto
  ) {
    return this.roomsService.createTasksList(roomId, createTasksListDto)
  }

  @Get('/:roomId/tasksLists/:tasksListId')
  fetchTasksList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('tasksListId') tasksListId: TasksListIdDto
  ) {
    return this.roomsService.fetchTasksList(roomId, tasksListId)
  }

  @Delete('/:roomId/tasksLists/:tasksListId')
  deleteTasksList(
    @Param('roomId') roomId: RoomIdDto,
    @Param('tasksListId') tasksListId: TasksListIdDto
  ) {
    return this.roomsService.deleteTasksList(roomId, tasksListId)
  }

  @Post('/:roomId/tasksLists/:tasksListId/tasks')
  createTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('tasksListId') tasksListId: TasksListIdDto,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.roomsService.createTask(roomId, tasksListId, createTaskDto)
  }

  @Delete('/:roomId/tasksLists/:tasksListId/tasks/:taskId')
  deleteTask(
    @Param('roomId') roomId: RoomIdDto,
    @Param('taskId') tasksListId: TasksListIdDto,
    @Param('taskId') taskId: TaskIdDto
  ) {
    return this.roomsService.deleteTask(roomId, tasksListId, taskId)
  }
}
