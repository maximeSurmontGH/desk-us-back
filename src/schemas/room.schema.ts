import * as mongoose from 'mongoose'

import { UserSchema } from './user.schema'
import { TaskListSchema } from './task-list.schema'

export const RoomSchema = new mongoose.Schema({
  saloonId: String,
  title: String,
  description: String,
  tasks: [TaskListSchema],
  users: [UserSchema]
})
