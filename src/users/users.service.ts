import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { omit } from 'lodash'

import { CreateUserDto } from './dtos/create-user.dto'
import { ConnectUserDto } from './dtos/connect-user.dto'
import { UserIdDto } from './dtos/user-id.dto'

import { User } from './entities/user.entities'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const userCreated = new this.userModel({
        ...createUserDto,
        userId: (Math.random() * 10000000).toFixed(0)
      })
      return omit(await userCreated.save(), ['password'])
    } catch (err) {
      throw new BadRequestException('Unknown error.')
    }
  }

  public async userConnexion(connectUserDto: ConnectUserDto) {
    try {
      const findResult = await this.userModel.findOne({
        login: connectUserDto.login,
        password: connectUserDto.password
      })
      if (!findResult) {
        throw new UnauthorizedException('Wrong login or password.')
      }
      return omit(findResult, ['password'])
    } catch (err) {
      throw new BadRequestException('Unknown error.')
    }
  }

  public async getUser(userId: UserIdDto) {
    try {
      const findResult = await this.userModel.findOne({ userId: userId })
      if (!findResult) {
        throw new NotFoundException(`User from userId ${userId} not found.`)
      }
      return omit(findResult, ['password'])
    } catch (err) {
      throw new BadRequestException('Unknown error.')
    }
  }

  public async deleteUser(userId: UserIdDto) {
    try {
      const deleteResult = await this.userModel.deleteOne({ userId: userId })
      if (deleteResult.deletedCount !== 1) {
        throw new NotFoundException(`User from userId ${userId} not found.`)
      }
    } catch (err) {
      throw new BadRequestException('Unknown error.')
    }
  }
}
