import { TasksList } from './tasks-list.entity'
import { ITasksList } from './tasks-list.interface'
import { TaskBuilder } from './task.builder'

export class TasksListBuilder {
  private tasksList: TasksList

  public static aTasksList(): TasksListBuilder {
    return new TasksListBuilder()
  }

  constructor() {
    this.tasksList = new TasksList()
  }

  public fromSchemaResponse(tasksList: ITasksList): this {
    this.tasksList.tasksListId = tasksList._id || ''
    this.tasksList.title = tasksList.title
    this.tasksList.order = tasksList.order
    this.tasksList.tasks = tasksList.tasks.map(task =>
      TaskBuilder.aTask()
        .fromSchemaResponse(task)
        .build()
    )
    return this
  }

  public withTasksListId(tasksListId: TasksList['tasksListId']): this {
    this.tasksList.tasksListId = tasksListId
    return this
  }

  public withTitle(title: TasksList['title']): this {
    this.tasksList.title = title
    return this
  }

  public withOrder(order: TasksList['order']): this {
    this.tasksList.order = order
    return this
  }

  public withTasls(tasks: TasksList['tasks']): this {
    this.tasksList.tasks = tasks
    return this
  }

  public build(): TasksList {
    return this.tasksList
  }
}
