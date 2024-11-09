import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop({ required: true })
  Title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  members: mongoose.Schema.Types.ObjectId[];

  @Prop({
    required: true,
    enum: ["public", "private", "conversation"],
    default: "conversation",
  })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [String], required: true })
  badWords: string[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);