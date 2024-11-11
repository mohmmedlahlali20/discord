import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Message } from './schema/message.schema';  
import { MessagesDto } from './dto/message.dto';   

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private server: Server;
    private users: { [key: string]: string } = {}; 

    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message> 
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
                delete this.users[userId];
            }
        }
    }

    @SubscribeMessage('send_message')
    async handleSendMessage(client: Socket, messageDto: MessagesDto) {
        const { senderId, receiverId, text, conversationId } = messageDto;

        
        const message = new this.messageModel({
            senderId,  
            receiverId,  
            text,
            conversation: conversationId,  
        });

        
        await message.save();

        
        this.server.to(conversationId.toString()).emit('message', message);

        
        return { event: 'message', data: message };
    }

    @SubscribeMessage('receive_message')
    handleReceiveMessage(@MessageBody() message: any): WsResponse<any> {
        
        return { event: 'receive_message', data: message };
    }

    private getConversationId(senderId: string, receiverId: string): string {
        
        return `${senderId}-${receiverId}`;
    }
}
