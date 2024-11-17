import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MessagesDto {
  @IsMongoId()
  senderId: Types.ObjectId;

  @IsMongoId()
  receiverId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsMongoId()
  conversationId: Types.ObjectId;

  //   @IsMongoId()
  //   channelId: Types.ObjectId;
}
