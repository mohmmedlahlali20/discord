import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/user/schema/user.schema";

export enum Visibility{
    Private= 'Private',
    Public= 'Public',
    GroupChat= 'GroupChatPublic'
    
}
@Schema({
    timestamps: true,
})


export class Conversation{
    @Prop({type: [Types.ObjectId], ref: User.name, required:true})
    Participants: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })  
    messages: Types.ObjectId[];

    @Prop()
    visibility: Visibility

}

export const ConversationSchema = SchemaFactory.createForClass(Conversation)