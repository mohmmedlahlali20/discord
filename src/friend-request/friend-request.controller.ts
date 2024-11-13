import { Controller, Post,Body, Get, Param, Patch } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendRequest } from './schema/firend-request.schema';
import { MessagesDto } from 'src/message/dto/message.dto';

@Controller('fr')
export class FriendRequestController {
    constructor(
        private friendRequestService: FriendRequestService
    ){}

    @Post('send')
    async friendRequest(
        @Body() friendRequestDto: FriendRequestDto, 
  ) {
    try {
      const request = await this.friendRequestService.sendFriendRequest(friendRequestDto);
      return request
    }catch(err){
        throw err
    }
    }

    @Patch('accept/:id')
    async acceptRequest(
        @Param('id') requestId: string,
        @Body() friendRequestDto: FriendRequestDto
    ): Promise<FriendRequest> {
        try {
            const acceptedRequest = await this.friendRequestService.acceptRequest(requestId, friendRequestDto);
            return acceptedRequest;
        } catch (err) {
            throw err;
        }
    }
}
