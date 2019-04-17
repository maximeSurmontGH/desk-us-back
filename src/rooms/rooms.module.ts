import { Module } from '@nestjs/common'

import { TasksListsModule } from '../tasks-lists/tasks-lists.module'

import { RoomsController } from './rooms.controller'

import { RoomsService } from './rooms.service'
import { TasksListsService } from '../tasks-lists/tasks-lists.service'
import { TasksService } from '../tasks/tasks.service'

@Module({
  // imports: [TasksListsModule],
  controllers: [RoomsController],
  // providers: [RoomsService],
  providers: [RoomsService, TasksListsService, TasksService],
})
export class RoomsModule {}
