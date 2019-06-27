import { User } from '../user.entity'
import { IUser } from '../user.interface'

export class UserBuilder {
  private user: User

  public static aUser(): UserBuilder {
    return new UserBuilder()
  }

  constructor() {
    this.user = new User()
  }

  public fromSchemaResponse(user: IUser): this {
    this.user.userId = user._id || ''
    this.user.email = user.email
    this.user.login = user.login
    this.user.password = user.password
    this.user.name = user.name
    return this
  }

  public withUserId(userId: User['userId']): this {
    this.user.userId = userId
    return this
  }

  public withEmail(email: User['email']): this {
    this.user.email = email
    return this
  }

  public withLogin(login: User['login']): this {
    this.user.login = login
    return this
  }

  public withPassword(password: User['password']): this {
    this.user.password = password
    return this
  }

  public withName(name: User['name']): this {
    this.user.name = name
    return this
  }

  public build(): User {
    return this.user
  }
}
