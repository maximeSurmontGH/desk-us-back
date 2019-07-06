import * as mongoose from 'mongoose'
import { TasksListSchema } from './tasks-list.schema'

export const RoomSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  description: String,
  tasksLists: [TasksListSchema]
})
