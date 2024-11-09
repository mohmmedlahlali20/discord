import { Controller, Post,Body } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestDto } from './dto/friend-request.dto';

@Controller('fr')
export class FriendRequestController {
    constructor(
        private friendRequestService: FriendRequestService
    ){}

    @Post()
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
}
