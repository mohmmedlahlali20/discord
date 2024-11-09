import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  sender: Types.ObjectId;  

  @Prop({ required: true })
  text: string;  

  @Prop({ required: true, type: Types.ObjectId, ref: 'Conversation' })
  conversation: Types.ObjectId;  

//   @Prop({ default: false })
//   isEdited: boolean;  
}

export const MessageSchema = SchemaFactory.createForClass(Message)