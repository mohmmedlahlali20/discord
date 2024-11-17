import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';


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
}
