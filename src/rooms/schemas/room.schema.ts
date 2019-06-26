import * as mongoose from 'mongoose'

import { UserSchema } from '../../users/schemas/user.schema'
import { TaskListSchema } from './task-list.schema'

export const RoomSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  description: String,
  tasksLists: [TaskListSchema],
  users: [UserSchema]
})
