import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type UserDocument = User & Document;

export enum Role{
    User= 'User',
    Mod= 'Mod'
}
export enum Status{
    Online= 'Online',
    Offline= 'Offline'
}

@Schema({
    timestamps: true
})
export class User{
    
    @Prop({unique: true})
        name: string;

    @Prop({required:true, unique: true })
        email: string

    @Prop({required:true })
        password: string

    @Prop({default: Role.User})
        role: Role
        
    @Prop()
        status: Status

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}], required: true })
        friends: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User)