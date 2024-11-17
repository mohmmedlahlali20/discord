import { Controller, Get, Param } from '@nestjs/common';
import { Conversation } from './schema/conversation.schema';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
constructor(private conversationService: ConversationService){}

    
  @Get('/user/:userId') 
  async getUserConversations(@Param('userId') userId: string): Promise<Conversation[]> {
    return this.conversationService.getConversationOfUser(userId);
  }
}
