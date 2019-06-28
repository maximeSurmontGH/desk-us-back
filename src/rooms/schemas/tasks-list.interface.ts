import { ITask } from './task.interface'
import * as mongoose from 'mongoose'

export interface ITasksList extends mongoose.Document {
  readonly _id?: string
  readonly tasksListId: string
  readonly title: string
  readonly order: number
  readonly tasks: ITask[]
}
