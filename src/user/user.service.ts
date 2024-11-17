    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { User, UserDocument } from './schema/user.schema';


    @Injectable()
    export class UserService {
    

        constructor (
            @InjectModel(User.name) private userModel: Model<UserDocument>,
        ) {}

        async getAllFriends(userId: string): Promise<User[]> {
            const user = await this.userModel.findById(userId);
        
            if (!user) {
                throw new Error('User not found');
            }
        
            const friendsIds = user.friends;  // Array of ObjectIds of the friends
            const friends = await this.userModel.find({ _id: { $in: friendsIds } }).exec();  // Query friends by their ObjectIds
        
            return friends;
        }
        
        async GetAllUsers(): Promise<UserDocument[]> {
            return await this.userModel.find().exec();
        }
        

    }
