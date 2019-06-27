import { IRoom } from './room.interface'
import { TasksList } from './tasks-list.entity'
import { User } from 'src/users/entities/user.entity'

export class Room implements IRoom {
  public roomId: string
  public title: string
  public description: string
  public tasksLists: TasksList[]
  public users: User[]
}
