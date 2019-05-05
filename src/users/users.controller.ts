import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UseFilters
} from '@nestjs/common'

import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter'

import { UsersService } from './users.service'

import { CreateUserDto } from './dtos/create-user.dto'
import { ConnectUserDto } from './dtos/connect-user.dto'
import { UserIdDto } from './dtos/user-id.dto'

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @Post('/connection')
  userConnexion(@Body() connectUserDto: ConnectUserDto) {
    return this.usersService.userConnexion(connectUserDto)
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: UserIdDto) {
    return this.usersService.getUser(userId)
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: UserIdDto) {
    return this.usersService.deleteUser(userId)
  }
}
