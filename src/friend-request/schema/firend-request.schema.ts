import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from 'src/user/schema/user.schema';

export enum Status{
    Pending= 'Pending',
    Accepted= 'Accepted',
    Denyed= 'Denyed'
}
@Schema({
    timestamps: true
})
export class FriendRequest{

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    sender: Types.ObjectId;   

    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    reciever: Types.ObjectId;

    @Prop({ default: 'pending' })
    status: Status;  

}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest)