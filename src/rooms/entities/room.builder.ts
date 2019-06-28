import { IRoom } from '../schemas/room.interface'
import { Room } from './room.entity'
import { TasksListBuilder } from './tasks-list.builder'
import { UserBuilder } from 'src/users/entities/user.builder'

export class RoomBuilder {
  private room: Room

  public static aRoom() {
    return new RoomBuilder()
  }

  constructor() {
    this.room = new Room()
  }

  public fromSchemaResponse(room: IRoom): this {
    this.room.roomId = room._id || ''
    this.room.title = room.title
    this.room.description = room.description
    this.room.tasksLists = room.tasksLists.map(tasksList =>
      TasksListBuilder.aTasksList()
        .fromSchemaResponse(tasksList)
        .build()
    )
    this.room.users = room.users.map(user =>
      UserBuilder.aUser()
        .fromSchemaResponse(user)
        .build()
    )
    return this
  }

  public withRoomId(roomId: Room['roomId']): this {
    this.room.roomId = roomId
    return this
  }

  public withTitle(title: Room['title']): this {
    this.room.title = title
    return this
  }

  public withDescription(description: Room['description']): this {
    this.room.description = description
    return this
  }

  public withTasksLists(tasksLists: Room['tasksLists']): this {
    this.room.tasksLists = tasksLists
    return this
  }

  public withUsers(users: Room['users']): this {
    this.room.users = users
    return this
  }

  public build(): Room {
    return this.room
  }
}
