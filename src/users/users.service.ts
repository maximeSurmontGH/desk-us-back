import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateUserDto } from './dtos/create-user.dto'
import { ConnectUserDto } from './dtos/connect-user.dto'
import { UserIdDto } from './dtos/user-id.dto'
import { IsEmailExistingDto } from './dtos/is-email-existing.dto'
import { IsLoginExistingDto } from './dtos/is-login-existing.dto'

import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async createUser(createUserDto: CreateUserDto) {
    const isUserExisting = await this.isUserExisting(
      createUserDto.email,
      createUserDto.login
    )
    if (isUserExisting) {
      throw new UnauthorizedException(
        'User with same login or email already exist.'
      )
    }
    try {
      const userCreated = new User(createUserDto)
      const userToCreate = new this.userModel({
        ...userCreated,
        password: createUserDto.password
      })
      await userToCreate.save()
      return userCreated
    } catch (err) {
      throw new InternalServerErrorException('New user not saved.')
    }
  }

  public async isUserExisting(email: string, login: string) {
    const isUserExisting = await this.userModel.find({
      $or: [{ email: email }, { login: login }]
    })
    return isUserExisting.length ? true : false
  }

  public async isLoginExisting(isLoginExistingDto: IsLoginExistingDto) {
    const isLoginExisting = await this.userModel.find(isLoginExistingDto)
    return isLoginExisting.length ? true : false
  }

  public async isEmailExisting(isEmailExistingDto: IsEmailExistingDto) {
    const isEmailExisting = await this.userModel.find({
      login: isEmailExistingDto.email
    })
    return isEmailExisting.length ? true : false
  }

  public async connectUser(connectUserDto: ConnectUserDto) {
    const userToConnect = await this.userModel.findOne({
      login: connectUserDto.login,
      password: connectUserDto.password
    })
    if (!userToConnect) {
      throw new UnauthorizedException('Wrong login or password.')
    }
    const userConnected = new User(userToConnect)
    return userConnected
  }

  public async fetchUser(userIdDto: UserIdDto) {
    const userToFetch = await this.userModel.findOne({ _id: userIdDto })
    if (!userToFetch) {
      throw new NotFoundException(
        `User from userId ${userIdDto.userId} not found.`
      )
    }
    const userFetched = new User(userToFetch)
    return userFetched
  }

  public async deleteUser(userIdDto: UserIdDto) {
    const deleteResult = await this.userModel.findOneAndDelete({
      _id: userIdDto
    })
    if (!deleteResult) {
      throw new NotFoundException(
        `User from userId ${userIdDto.userId} not found.`
      )
    }
  }
}
