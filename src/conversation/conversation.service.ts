import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from './schema/conversation.schema';

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(Conversation.name) private conversation: Model<Conversation>
){}

        async getConversationOfUser (userId1: string): Promise<Conversation[]>{
                    return await this.conversation.find({
                        participants:userId1
                    }).exec();
        }

}
    
