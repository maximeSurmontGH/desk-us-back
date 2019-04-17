import { Module } from '@nestjs/common'

import { TastksModule } from '../tasks/tasks.module'

import { TasksListsService } from './tasks-lists.service'

@Module({
  imports: [TastksModule],
  exports: [TastksModule],
  providers: [TasksListsService],
})
export class TasksListsModule {}
