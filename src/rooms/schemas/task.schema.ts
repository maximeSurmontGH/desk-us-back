import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
  taskId: String,
  order: Number,
  message: String,
  state: String
})
