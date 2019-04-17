import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from 'nestjs-config'

import { CreateRoomDto } from './dtos/create-room.dto'
import { UpdateRoomDto } from './dtos/update-room.dto'
import { RoomIdDto } from './dtos/room-id.dto'

@Injectable()
export class RoomsService {
  constructor(private readonly config: ConfigService) {
    this.config = config
  }

  public getRooms() {
    console.log(this.config.get('express.port'))
    throw new UnauthorizedException('WRONG LOGIN OR PASSWORD')
    // return `all rooms`
  }

  public createRoom(createRoomDto: CreateRoomDto) {
    return 'create a new room'
  }

  public getRoom(roomId: RoomIdDto) {
    return `all tasks lists from room ${roomId}`
  }

  public updateRoom(roomId: RoomIdDto, updateRoomDto: UpdateRoomDto) {
    return `update room ${roomId}`
  }

  public deleteRoom(roomId: RoomIdDto) {
    return `delete room ${roomId}`
  }
}
