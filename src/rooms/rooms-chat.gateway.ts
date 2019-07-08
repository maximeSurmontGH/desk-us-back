import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets'
import { Client, Server } from 'socket.io'

@WebSocketGateway()
export class RoomsChatGateway {
  @WebSocketServer()
  server: Server

  // @todo work?
  @SubscribeMessage('rooms-chat/:roomId')
  async onChat(client: Client, message: string) {
    return message
  }
}
