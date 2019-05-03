import { IRoom } from './room.interface'
import { TaskList } from './task-list.entity'
import { User } from 'src/users/entities/user.entities'

export interface Room extends IRoom {
  readonly tasks: TaskList[]
  readonly users: User[]
}
