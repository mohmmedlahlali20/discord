import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class MessagesDto{
    @IsNotEmpty()
    @IsMongoId()
    sender: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsMongoId()
    conversation: Types.ObjectId
}