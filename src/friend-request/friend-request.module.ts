import { Module } from '@nestjs/common';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestService } from './friend-request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/conversation/schema/conversation.schema';
import { Message, MessageSchema } from 'src/message/schema/message.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { FriendRequest, FriendRequestSchema } from './schema/firend-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [FriendRequestController],
  providers: [FriendRequestService]
})
export class FriendRequestModule {}
