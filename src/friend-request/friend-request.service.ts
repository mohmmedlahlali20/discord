import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FriendRequest } from './schema/firend-request.schema';
import { Model } from 'mongoose';
import { Conversation } from 'src/conversation/schema/conversation.schema';
import { Message } from 'src/message/schema/message.schema';
import { User } from 'src/user/schema/user.schema';
import { MessagesDto } from 'src/message/dto/message.dto';
import { FriendRequestDto } from './dto/friend-request.dto';
import { NotificationService } from 'src/notification/notification.service';

import { Status as FriendRequestStatus } from "./schema/firend-request.schema";


@Injectable()
export class FriendRequestService {
    constructor(
        @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequest>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
        private notificationsService: NotificationService
    ){} 

    async sendFriendRequest(FriendRequestDto): Promise<FriendRequest>{
        const { senderId, receiverId } = FriendRequestDto;
        const sender= await this.userModel.findById(senderId)
        const receiver= await this.userModel.findById(receiverId)

        if(!sender || sender == receiver){
            throw new Error('Both sender and receiver must exist');
        }

        const existingFriendRequest = ({
            sender,
            receiver
        })

        if(!existingFriendRequest){
            throw new Error('Friend request already exists')
        }

        const friendRequest = new this.friendRequestModel({
            sender,
            receiver
        })

       await friendRequest.save()
        return friendRequest;

    }
    async acceptRequest(requestId: string,  friendRequestDto: FriendRequestDto ): Promise<FriendRequest> {
        // const frId = this.friendRequestModel.findById(friendRequestDto.)
        const updatedRequest = await this.friendRequestModel.findByIdAndUpdate(
            requestId,
            { status: 'Accepted' },
            { new: true } 
        );
     
        
    
        const friendRequest = await this.friendRequestModel.findById(requestId);
        if (!friendRequest) {
            throw new Error('Friend request not found');
        }
    
        const senderId = friendRequest.sender;
        const receiverId = friendRequest.receiver;
    
    

        const sender = await this.userModel.findById(senderId);
        const receiver = await this.userModel.findById(receiverId);

        if (!sender || !receiver) {
            throw new Error('Both users must exist to accept the friend request');
        }

        friendRequest.status = FriendRequestStatus.Accepted;
        await friendRequest.save();

        await this.userModel.findByIdAndUpdate(senderId, {
            $addToSet: { friends: receiverId }
        });
        await this.userModel.findByIdAndUpdate(receiverId, {
            $addToSet: { friends: senderId }
        });
    

       
        const conversation = new this.conversationModel({
            participants: [friendRequestDto.sender, friendRequestDto.receiver],
            type: 'private', 
        });

        await conversation.save();

        const populatedConversation = await this.conversationModel
        .findById(conversation._id)
        .populate('participants')
        .exec();

        this.notificationsService.sendNotification({
            type: 'FRIEND_REQUEST_ACCEPTED',
            message: `Your friend request has been accepted!`,
            senderId: senderId,
            receiverId: receiverId,
          });

        await updatedRequest.save();
        return updatedRequest
      }
      //Delete.....
      async deleteRequest (requestId: string, friendRequestDto: FriendRequestDto): Promise<FriendRequest>{

        const updateFriendRequest = await this.friendRequestModel.findByIdAndUpdate(
            requestId,
           { status: 'Denied' },
           { new: true }
        ) 
        await updateFriendRequest.save()
        return updateFriendRequest
          
        
        
      }
}


5
