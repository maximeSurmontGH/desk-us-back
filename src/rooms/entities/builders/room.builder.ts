import { IRoom } from '../room.interface'
import { Room } from '../room.entity'

export class RoomBuilder {
  private room: Room

  public aRoom() {
    return new RoomBuilder()
  }

  public fromSchemaResponse(room: IRoom): this {
    this.room.title = room.title
    this.room.description = room.description
    this.room.saloonId = room.saloonId
    // use builder
    // this.room.tasks = room.tasks
    // use builder
    // this.room.users = room.users
    return this
  }

  public withTitle(title: Room['title']): this {
    this.room.title = title
    return this
  }

  public build(): Room {
    return this.room
  }
}
