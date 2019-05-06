import { IUser } from './user.interface'

export class User implements IUser {
  public userId: string
  public email: string
  public login: string
  public password: string
  public name: string

  constructor(user: IUser) {
    this.email = user.email
    this.login = user.login
    this.name = user.name
    if (!user.userId) {
      this.userId = (Math.random() * 10000000).toFixed(0)
    } else {
      this.userId = user.userId
    }
  }
}
