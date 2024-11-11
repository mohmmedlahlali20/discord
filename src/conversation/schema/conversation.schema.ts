import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/schema/user.schema";

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  // @Prop({ type: Types.ObjectId, ref: 'Message' })
  // latestMessage: Types.ObjectId;

  @Prop({ default: 'private' })
  type: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
