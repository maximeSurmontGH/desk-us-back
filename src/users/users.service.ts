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
import { IsEmailExistingDto } from './dtos/is-email-existing.dto'
import { IsLoginExistingDto } from './dtos/is-login-existing.dto'
import { User } from './entities/user.entity'
import { UserBuilder } from './entities/user.builder'
import { IUser } from './schemas/user.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
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
      const userModel = new this.userModel(createUserDto)
      const user = await userModel.save()
      return UserBuilder.aUser()
        .fromSchemaResponse(user)
        .build()
    } catch (err) {
      throw new InternalServerErrorException('New user not saved.')
    }
  }

  public async isUserExisting(email: string, login: string): Promise<boolean> {
    const isUserExisting = await this.userModel.find({
      $or: [{ email: email }, { login: login }]
    })
    return !!isUserExisting.length
  }

  public async connectUser(connectUserDto: ConnectUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      login: connectUserDto.login,
      password: connectUserDto.password
    })
    if (!user) {
      throw new UnauthorizedException('Wrong login or password.')
    }
    return UserBuilder.aUser()
      .fromSchemaResponse(user)
      .build()
  }

  public async isEmailExisting(
    isEmailExistingDto: IsEmailExistingDto
  ): Promise<boolean> {
    const isEmailExisting = await this.userModel.find({
      email: isEmailExistingDto.email
    })
    return !!isEmailExisting.length
  }

  public async isLoginExisting(
    isLoginExistingDto: IsLoginExistingDto
  ): Promise<boolean> {
    const isLoginExisting = await this.userModel.find(isLoginExistingDto)
    return !!isLoginExisting.length
  }

  public async fetchUser(userId: string) {
    const user = await this.userModel.findOne({ _id: userId })
    if (!user) {
      throw new NotFoundException(`User from userId ${userId} not found.`)
    }
    return UserBuilder.aUser()
      .fromSchemaResponse(user)
      .build()
  }

  public async deleteUser(userId: string) {
    const deleteResult = await this.userModel.findOneAndDelete({
      _id: userId
    })
    if (!deleteResult) {
      throw new NotFoundException(`User from userId ${userId} not found.`)
    }
  }
}
