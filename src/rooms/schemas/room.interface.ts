import { ITasksList } from './tasks-list.interface'
import { IUser } from '../../users/schemas/user.interface'
import * as mongoose from 'mongoose'

export interface IRoom extends mongoose.Document {
  readonly _id?: string
  readonly roomId: string
  readonly title: string
  readonly description: string
  readonly tasksLists: ITasksList[]
  readonly users: IUser[]
}
