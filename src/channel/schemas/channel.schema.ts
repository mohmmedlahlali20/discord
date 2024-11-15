import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export type ChannelDocument = Channel & Document;

@Schema({ timestamps: true})
export class Channel {
  @Prop({ required: true })
  Title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  members: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  demandsForIntegration: mongoose.Schema.Types.ObjectId[];

  @Prop({
    required: true,
    enum: ["public", "private"],
    default: "private",
  })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [String], required: true })
  badWords: string[];
  

  @Prop({ type: Date, required: false })
  expiresAt: Date;
  
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);