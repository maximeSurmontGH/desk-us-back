import * as mongoose from 'mongoose'

import { TaskSchema } from './task.schema'

export const TaskListSchema = new mongoose.Schema({
  title: String,
  order: Number,
  tasks: [TaskSchema]
})
