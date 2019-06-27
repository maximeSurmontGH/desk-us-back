import { TaskList } from '../task-list.entity'
import { ITaskList } from '../task-list.interface'
import { TaskBuilder } from './task.builder'

export class TasksListBuilder {
  private tasksList: TaskList

  public static aTasksList(): TasksListBuilder {
    return new TasksListBuilder()
  }

  constructor() {
    this.tasksList = new TaskList()
  }

  public fromSchemaResponse(tasksList: ITaskList): this {
    this.tasksList.taskListId = tasksList._id || ''
    this.tasksList.title = tasksList.title
    this.tasksList.order = tasksList.order
    this.tasksList.tasks = tasksList.tasks.map(task =>
      TaskBuilder.aTask()
        .fromSchemaResponse(task)
        .build()
    )
    return this
  }

  public withTasksListId(taskListId: TaskList['taskListId']): this {
    this.tasksList.taskListId = taskListId
    return this
  }

  public withTitle(title: TaskList['title']): this {
    this.tasksList.title = title
    return this
  }

  public withOrder(order: TaskList['order']): this {
    this.tasksList.order = order
    return this
  }

  public withTasls(tasks: TaskList['tasks']): this {
    this.tasksList.tasks = tasks
    return this
  }

  public build(): TaskList {
    return this.tasksList
  }
}
