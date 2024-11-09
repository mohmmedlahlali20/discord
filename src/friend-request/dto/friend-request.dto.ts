import { IsNotEmpty, IsString } from "class-validator";

export class FriendRequestDto{

    
    @IsString()
    sender: string;

    
    @IsString()
    reciever: string;

    
}



