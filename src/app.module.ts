import { Module } from '@nestjs/common'
import { ConfigModule } from 'nestjs-config'
import { MongooseModule } from '@nestjs/mongoose'
import { resolve as pathResolve } from 'path'

import { UsersModule } from './users/users.module'
import { RoomsModule } from './rooms/rooms.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/desk-us'),
    UsersModule,
    RoomsModule,
    ConfigModule.load(pathResolve(__dirname, 'config', '**/!(*.d).{ts,js}'))
  ]
})
export class AppModule {}
