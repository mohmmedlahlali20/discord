import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, User, UserDocument } from './schema/user.schema';


@Injectable()
export class UserService {
  

    constructor (
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}


    async getAllFriends() : Promise<User[]> {
        return await this.userModel
        .find();
    }
    async GetAllUsers(): Promise<UserDocument[]> {
        return await this.userModel.find().exec();
      }

      async updateUserStatus(userId: string, status: Status): Promise<User> {
        const user = await this.userModel.findById(userId);
    
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found.`);
        }
    
        user.status = status;
        return await user.save();
      }
    

}
