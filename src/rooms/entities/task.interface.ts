export enum EState {
  IS_CHECKED = 'is-checked',
  IS_NOT_CHECKED = 'is-not-checked',
}

export interface ITask {
  readonly taskId: string
  readonly order: number
  readonly message: string
  readonly state: EState
}
