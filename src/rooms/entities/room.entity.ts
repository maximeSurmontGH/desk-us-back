import { IRoom } from '../schemas/room.interface'
import { TasksList } from './tasks-list.entity'

export class Room implements IRoom {
  public roomId: string
  public title: string
  public description: string
  public tasksLists: TasksList[]
}
