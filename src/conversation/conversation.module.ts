import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/message/schema/message.schema';
import { Conversation, ConversationSchema } from 'src/conversation/schema/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Conversation.name, schema: ConversationSchema }
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule {}
