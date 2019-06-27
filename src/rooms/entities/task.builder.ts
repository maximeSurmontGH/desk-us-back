import { Task } from './task.entity'
import { ITask } from './task.interface'

export class TaskBuilder {
  private task: Task

  public static aTask(): TaskBuilder {
    return new TaskBuilder()
  }

  constructor() {
    this.task = new Task()
  }

  public fromSchemaResponse(task: ITask): this {
    this.task.taskId = task._id || ''
    this.task.order = task.order
    this.task.message = task.message
    this.task.state = task.state
    return this
  }

  public withTaskId(taskId: Task['taskId']): this {
    this.task.taskId = taskId
    return this
  }

  public withOrder(order: Task['order']): this {
    this.task.order = order
    return this
  }

  public withMessage(message: Task['message']): this {
    this.task.message = message
    return this
  }

  public withState(state: Task['state']): this {
    this.task.state = state
    return this
  }

  public build(): Task {
    return this.task
  }
}
