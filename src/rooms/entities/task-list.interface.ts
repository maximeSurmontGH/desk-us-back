import { ITask } from './task.interface'
import * as mongoose from 'mongoose'

export interface ITaskList extends mongoose.Document {
  readonly taskListId: string
  readonly title: string
  readonly order: number
  readonly tasks: ITask[]
}
