import { IsNotEmpty, IsString } from "class-validator";

export class FriendRequestDto{

    @IsNotEmpty()
    @IsString()
    sender: string;

    @IsNotEmpty()
    @IsString()
    reciever: string;

    
}



