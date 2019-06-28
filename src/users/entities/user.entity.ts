import { IUser } from '../schemas/user.interface'

export class User implements IUser {
  public userId: string
  public email: string
  public login: string
  public password: string
  public name: string
}
