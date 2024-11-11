import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema()
export class Rating extends Document {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Channel', required: true })
    channel: Types.ObjectId;
  
    @Prop({ default: 0 })
    totalScore: number;
  
    @Prop({
      type: [
        {
          raterId: { type: Types.ObjectId, ref: 'User', required: true },
          score: { type: Number, required: true, min: 1, max: 5 },
        },
      ],
      default: [],
    })
    ratings: Array<{ raterId: Types.ObjectId; score: number }>;
  }


export type RatingDocument = Rating & Document
export const RatingSchema = SchemaFactory.createForClass(Rating);