import * as mongoose from 'mongoose'
import { TaskSchema } from './task.schema'

export const TasksListSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  order: Number,
  tasks: [TaskSchema]
})
