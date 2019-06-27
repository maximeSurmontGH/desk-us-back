import { ITaskList } from './task-list.interface'
import { IUser } from '../../users/entities/user.interface'
import * as mongoose from 'mongoose'

export interface IRoom extends mongoose.Document {
  readonly _id?: string
  readonly roomId: string
  readonly title: string
  readonly description: string
  readonly tasksLists: ITaskList[]
  readonly users: IUser[]
}
