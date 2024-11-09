import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Channel } from '../../channel/schemas/channel.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  sender: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: Channel.name, required: true })
  channel: Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
