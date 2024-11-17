
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';


import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UpdateStatusDto } from './dto/updatestatus.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.GetAllUsers();
  }

  @Get('getAll/:userId') 
  async getAllFriends(@Param('userId') userId: string): Promise<User[]> { 
      return this.userService.getAllFriends(userId);
  }


  @Patch('/:id/status')
  async updateStatus(
    @Param('id') userId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<User> {
    return this.userService.updateUserStatus(userId, updateStatusDto.status);
  }
}
