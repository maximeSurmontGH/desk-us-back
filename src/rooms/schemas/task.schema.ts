import * as mongoose from 'mongoose'

export const TaskSchema: mongoose.Schema = new mongoose.Schema({
  order: Number,
  message: String,
  state: String
})
