import { ITaskList } from './task-list.interface'
import { Task } from './task.entity'

export interface TaskList extends ITaskList {
  readonly tasks: Task[]
}
