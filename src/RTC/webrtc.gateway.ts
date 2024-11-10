import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebRtcGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebRTC Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('offer')
  handleOffer(
    client: Socket,
    payload: { offer: RTCSessionDescriptionInit; to: string },
  ) {
    this.server.to(payload.to).emit('offer', { offer: payload.offer, from: client.id });
  }

  @SubscribeMessage('answer')
  handleAnswer(
    client: Socket,
    payload: { answer: RTCSessionDescriptionInit; to: string },
  ) {
    this.server.to(payload.to).emit('answer', { answer: payload.answer, from: client.id });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(
    client: Socket,
    payload: { candidate: RTCIceCandidateInit; to: string },
  ) {
    this.server.to(payload.to).emit('ice-candidate', { candidate: payload.candidate, from: client.id });
  }
}
