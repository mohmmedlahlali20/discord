import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MessagesDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  receiverId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsMongoId()
  conversationId: Types.ObjectId;

//   @IsMongoId()  
//   channelId: Types.ObjectId;
}
