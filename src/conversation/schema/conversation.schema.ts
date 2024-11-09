import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/user/schema/user.schema";


    

@Schema({
    timestamps: true,
})


export class Conversation{
    @Prop({type: [Types.ObjectId], ref: User.name, required:true})
    Participants: Types.ObjectId[];

    

    @Prop()
    visibility: string

}

export const ConversationSchema = SchemaFactory.createForClass(Conversation)