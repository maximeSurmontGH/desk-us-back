import { Injectable, UnauthorizedException } from '@nestjs/common'

import { IUser } from './interfaces/user.interface'

import { CreateUserDto } from './dtos/create-user.dto'
import { ConnectUserDto } from './dtos/connect-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Injectable()
export class UsersService {
  public users: IUser[] = []

  public createUser(userDto: CreateUserDto) {
    return 'create a new user'
  }

  public userConnexion(connectUserDto: ConnectUserDto) {
    try {
      return 'connect a new user'
    } catch (err) {
      throw new UnauthorizedException('WRONG LOGIN OR PASSWORD')
    }
  }

  public updateUser(userId: string, userDto: UpdateUserDto) {
    return `update user ${userId}`
  }

  public deleteUser(userId: string) {
    return `delete user ${userId}`
  }
}
