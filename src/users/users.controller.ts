import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
} from '@nestjs/common'

import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter'

import { UsersService } from './users.service'

import { CreateUserDto } from './dtos/create-user.dto'
import { ConnectUserDto } from './dtos/connect-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

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

  @Put('/:userId')
  updateUser(@Param('userId') userId: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.updateUser(userId, userDto)
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }
}
