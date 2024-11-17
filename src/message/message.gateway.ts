import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';

@WebSocketGateway()
export class MessagingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private server: Server;
  private users: { [key: string]: string } = {};

  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    for (const userId in this.users) {
      if (this.users[userId] === client.id) {
        console.log(userId);
        delete this.users[userId];
      }
    }
  }





  private getConversationId(senderId: string, receiverId: string): string {
    return `${senderId}-${receiverId}`;
  }
}
