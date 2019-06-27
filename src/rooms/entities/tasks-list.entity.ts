import { ITasksList } from './tasks-list.interface'
import { Task } from './task.entity'

export class TasksList implements ITasksList {
  public tasksListId: string
  public title: string
  public order: number
  public tasks: Task[]
}
