import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseFilters,
  Put
} from '@nestjs/common'
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter'
import { RoomsService } from './rooms.service'
import { CreateTasksListDto } from './dtos/create-task-list.dto'
import { CreateTaskDto } from './dtos/create-task.dto'
import { CreateRoomDto } from './dtos/create-room.dto'
import { UpdateTasksListOrderDto } from './dtos/update-task-list-order.dto'
import { UpdateTasksListTitleDto } from './dtos/update-task-list-title.dto'
import { UpdateTaskOrderDto } from './dtos/update-task-order.dto'
import { UpdateTaskMessageDto } from './dtos/update-task-message.dto'
import { UpdateTaskStateDto } from './dtos/update-task-state.dto'

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
  fetchRoom(@Param('roomId') roomId: string) {
    return this.roomsService.fetchRoom(roomId)
  }

  @Delete('/:roomId')
  deleteRoom(@Param('roomId') roomId: string) {
    return this.roomsService.deleteRoom(roomId)
  }

  @Post('/:roomId/tasksLists')
  createTasksList(
    @Param('roomId') roomId: string,
    @Body() createTasksListDto: CreateTasksListDto
  ) {
    return this.roomsService.createTasksList(roomId, createTasksListDto)
  }

  @Get('/:roomId/tasksLists/:tasksListId')
  fetchTasksList(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string
  ) {
    return this.roomsService.fetchTasksList(roomId, tasksListId)
  }

  @Put('/:roomId/tasksLists/:tasksListId/update-tasks-list-order')
  updateTasksListOrder(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Body() updateTasksListOrderDto: UpdateTasksListOrderDto
  ) {
    return this.roomsService.updateTasksListOrder(
      roomId,
      tasksListId,
      updateTasksListOrderDto
    )
  }

  @Put('/:roomId/tasksLists/:tasksListId/update-tasks-list-title')
  updateTasksListTitle(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Body() updateTasksListTitleDto: UpdateTasksListTitleDto
  ) {
    return this.roomsService.updateTasksListTitle(
      roomId,
      tasksListId,
      updateTasksListTitleDto
    )
  }

  @Delete('/:roomId/tasksLists/:tasksListId')
  deleteTasksList(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string
  ) {
    return this.roomsService.deleteTasksList(roomId, tasksListId)
  }

  @Post('/:roomId/tasksLists/:tasksListId/tasks')
  createTask(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.roomsService.createTask(roomId, tasksListId, createTaskDto)
  }

  @Put('/:roomId/tasksLists/:tasksListId/tasks/:taskId/update-task-order')
  updateTaskOrder(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskOrderDto: UpdateTaskOrderDto
  ) {
    return this.roomsService.updateTaskOrder(
      roomId,
      tasksListId,
      taskId,
      updateTaskOrderDto
    )
  }

  @Put('/:roomId/tasksLists/:tasksListId/tasks/:taskId/update-task-message')
  updateTaskMessage(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskMessageDto: UpdateTaskMessageDto
  ) {
    return this.roomsService.updateTaskMessage(
      roomId,
      tasksListId,
      taskId,
      updateTaskMessageDto
    )
  }

  @Put('/:roomId/tasksLists/:tasksListId/tasks/:taskId/update-task-state')
  updateTask(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskStateDto: UpdateTaskStateDto
  ) {
    return this.roomsService.updateTaskState(
      roomId,
      tasksListId,
      taskId,
      updateTaskStateDto
    )
  }

  @Delete('/:roomId/tasksLists/:tasksListId/tasks/:taskId')
  deleteTask(
    @Param('roomId') roomId: string,
    @Param('tasksListId') tasksListId: string,
    @Param('taskId') taskId: string
  ) {
    return this.roomsService.deleteTask(roomId, tasksListId, taskId)
  }
}
