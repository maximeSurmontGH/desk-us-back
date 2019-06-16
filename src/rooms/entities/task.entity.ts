import { ITask, EState } from './task.interface'

export class Task implements ITask {
  public taskId: string
  public order: number
  public message: string
  public state: EState
}
