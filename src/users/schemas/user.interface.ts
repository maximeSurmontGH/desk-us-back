export interface IUser {
  readonly _id?: string
  readonly userId: string
  readonly email: string
  readonly login: string
  readonly password: string
  readonly name: string
  readonly roomIds: string[]
}
