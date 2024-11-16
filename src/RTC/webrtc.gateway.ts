import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../message/schema/message.schema';
import { Model } from 'mongoose';

@WebSocketGateway({ cors: true })
export class WebRtcGateway {
  @WebSocketServer() server: Server;

  // Use a map to track connected users
  private connectedUsers = new Map<string, string>();

  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  // When a user connects, store their userId and socketId
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    this.connectedUsers.set(client.id, client.id);
  }

  // When a user disconnects, remove them from the users list
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id);
  }

  // Handle the Send_message event
  @SubscribeMessage('Send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() messageDto: any,
  ) {
    const { senderId, receiverId, text, conversationId } = messageDto;

    // Save the message to the database
    const message = new this.messageModel({
      senderId,
      receiverId,
      text,
      conversation: conversationId,
    });

    try {
      // Save the message to the database
      await message.save();

      // Emit the message to the sender
      client.emit('message_sent', { success: true, message });

      // Send the message to each connected user (or the specific users in the conversation)
      this.connectedUsers.forEach((userSocket, socketId) => {
        console.log(socketId);
        // You could check if the user is part of the conversation before sending the message
        if (socketId !== client.id) {
          // Optionally exclude the sender
          this.server.to(socketId).emit('message_sent', message);
        }
      });

      console.log('Message successfully saved and emitted');
    } catch (error) {
      console.error('Error saving message:', error);
      client.emit('message_sent', { success: false, error: error.message });
    }
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: { offer: string; to: string }) {
    console.log(`Offer received from client ${client.id}: ${payload.offer}`);
    this.server
      .to(payload.to)
      .emit('offer', { offer: payload.offer, from: client.id });
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: { answer: string; to: string }) {
    console.log(`Answer received from client ${client.id}: ${payload.answer}`);
    this.server
      .to(payload.to)
      .emit('answer', { answer: payload.answer, from: client.id });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(
    client: Socket,
    payload: { candidate: string; to: string },
  ) {
    console.log(
      `ICE Candidate received from client ${client.id}: ${payload.candidate}`,
    );
    this.server
      .to(payload.to)
      .emit('ice-candidate', { candidate: payload.candidate, from: client.id });
  }
}
