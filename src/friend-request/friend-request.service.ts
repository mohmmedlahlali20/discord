import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FriendRequest } from './schema/firend-request.schema';
import { Model } from 'mongoose';
import { Conversation } from 'src/conversation/schema/conversation.schema';
import { Message } from 'src/message/schema/message.schema';
import { User } from 'src/user/schema/user.schema';
import { MessagesDto } from 'src/message/dto/message.dto';

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequest>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
        @InjectModel(Message.name) private messageModel: Model<Message>
    ){}


    async sendFriendRequest(FriendRequestDto): Promise<FriendRequest>{
        const { senderId, receiverId } = FriendRequestDto;
        const sender= await this.userModel.findById(senderId)
        const reciever= await this.userModel.findById(receiverId)

        if(!sender || sender == reciever){
            throw new Error('Both sender and receiver must exist');
        }

        const existingFriendRequest = ({
            sender,
            reciever
        })

        if(!existingFriendRequest){
            throw new Error('Friend request already exists')
        }

        const friendRequest = new this.friendRequestModel({
            sender,
            reciever
        })

       await friendRequest.save()

       
        return friendRequest;
    }

    async acceptRequest(requestId: string, FriendRequestDto ): Promise<FriendRequest> {
     
        
        const updatedRequest = await this.friendRequestModel.findByIdAndUpdate(
            requestId,
            { status: 'Accepted' },
            { new: true } 
        );

        const conversation = new this.conversationModel({
            participants: [FriendRequestDto],
            type: 'private', 
        });
    
        await conversation.save();
    
        await updatedRequest.save();
        return updatedRequest;
        return  ;
      }
}
