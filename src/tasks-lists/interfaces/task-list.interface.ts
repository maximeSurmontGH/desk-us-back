import { ITask } from '../../tasks/interfaces/task.interface'

export interface ITaskList {
  readonly title: string
  readonly order: number
  readonly tasks: ITask[]
}
