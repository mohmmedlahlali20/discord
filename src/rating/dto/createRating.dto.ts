import { IsNumber, IsString, IsNotEmpty } from "class-validator";


export class CreateRatingDto {
    
    @IsString()
    @IsNotEmpty()
    rater: string;

    @IsString()
    @IsNotEmpty()
    user: string;

    @IsNumber()
    score: number;
    
}