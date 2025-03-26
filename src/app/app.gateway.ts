/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  @SubscribeMessage('new-message')
  public newMessage(client: Socket, message: string) {
    console.log(message);
    
    this.server.emit('send-message', {
      client: client.id,
      message: message,
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('New user connected...', client.id);

    this.server.emit('user-connected', {
      message: 'User connected to chat',
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User left...', client.id);

    this.server.emit('user-left', {
      message: 'User left from chat',
    });
  }
}
