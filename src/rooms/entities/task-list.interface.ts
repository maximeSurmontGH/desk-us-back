import { ITask } from './task.interface'

export interface ITaskList {
  readonly title: string
  readonly order: number
  readonly tasks: ITask[]
}
