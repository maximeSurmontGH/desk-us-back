import { ITaskList } from './task-list.interface'
import { IUser } from '../../users/entities/user.interface'
import * as mongoose from 'mongoose'

export interface IRoom extends mongoose.Document {
  readonly saloonId: string
  readonly title: string
  readonly description: string
  readonly tasks: ITaskList[]
  readonly users: IUser[]
}
