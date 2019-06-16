import { ITaskList } from './task-list.interface'
import { Task } from './task.entity'

export class TaskList implements ITaskList {
  public title: string
  public order: number
  public tasks: Task[]
}
