import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from '../channel/schemas/channel.schema';
import { Message, MessageSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
