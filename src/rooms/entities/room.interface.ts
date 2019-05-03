import { ITaskList } from './task-list.interface'
import { IUser } from '../../users/entities/user.interface'

export interface IRoom {
  readonly saloonId: string
  readonly title: string
  readonly description: string
  readonly tasks: ITaskList[]
  readonly users: IUser[]
}
