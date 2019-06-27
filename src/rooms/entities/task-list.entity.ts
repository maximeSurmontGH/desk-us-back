import { ITaskList } from './task-list.interface'
import { Task } from './task.entity'

export class TaskList implements ITaskList {
  public taskListId: string
  public title: string
  public order: number
  public tasks: Task[]
}
