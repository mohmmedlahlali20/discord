import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('channels/:channelId')
  async sendMessage(
    @Param('channelId') channelId: string,
    @Body('userId') userId: string,
    @Body('text') text: string,
  ): Promise<Message> {
    return this.messageService.sendMessage(channelId, userId, text);
  }

  @Get(':channelId/messages')
  async getMessagesByChannelId(@Param('channelId') channelId: string): Promise<Message[]> {
    return this.messageService.getMessageByChannelId(channelId);
  }
}
