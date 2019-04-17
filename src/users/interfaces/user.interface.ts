import { IRoom } from '../../rooms/interfaces/room.interface'

export interface IUser {
  readonly userId: string
  readonly email: string
  readonly login: string
  readonly password: string
  readonly name: string
  readonly saloons: IRoom[]
}
