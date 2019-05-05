import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  email: String,
  login: String,
  password: String,
  name: String
})
