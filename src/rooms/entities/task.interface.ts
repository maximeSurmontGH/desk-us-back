import * as mongoose from 'mongoose'

export enum EState {
  IS_CHECKED = 'is-checked',
  IS_NOT_CHECKED = 'is-not-checked'
}

export interface ITask extends mongoose.Document {
  readonly taskId: string
  readonly order: number
  readonly message: string
  readonly state: EState
}
