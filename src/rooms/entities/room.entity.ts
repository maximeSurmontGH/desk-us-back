import { IRoom } from './room.interface'
import { TaskList } from './task-list.entity'
import { User } from 'src/users/entities/user.entities'

export class Room implements IRoom {
  public title: string
  public description: string
  public tasks: TaskList[]
  public users: User[]
  public saloonId: string
}
