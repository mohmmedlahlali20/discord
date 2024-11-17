import { Controller, Get, Param } from '@nestjs/common';
import { Conversation } from './schema/conversation.schema';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
constructor(private conversationService: ConversationService){}

    @Get('/')
    
    async getAllConversations(@Param('id') userId1: string): Promise<Conversation[]>{
        return this.conversationService.getConversationOfUser(userId1)
    }
}
