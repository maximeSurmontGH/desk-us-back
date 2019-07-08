import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UserSchema } from './schemas/user.schema'
import { RoomsService } from 'src/rooms/rooms.service'
import { RoomSchema } from 'src/rooms/schemas/room.schema'
import { TasksListSchema } from 'src/rooms/schemas/tasks-list.schema'
import { TaskSchema } from 'src/rooms/schemas/task.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'TasksList', schema: TasksListSchema },
      { name: 'Task', schema: TaskSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, RoomsService]
})
export class UsersModule {}
