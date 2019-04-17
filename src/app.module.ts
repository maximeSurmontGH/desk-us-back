import { Module } from '@nestjs/common'
import { ConfigModule } from 'nestjs-config'
import { resolve as pathResolve } from 'path'

import { UsersModule } from './users/users.module'
import { RoomsModule } from './rooms/rooms.module'

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    ConfigModule.load(pathResolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
  ],
})
export class AppModule {}
