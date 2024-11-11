import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RatingService } from './rating.service';



@Controller('ratings')
export class RatingController {

    constructor(private readonly ratingService: RatingService) {}


    @Post('/rate')
    async createRating(
        @Body('channelId') channelId: string,
        @Body('raterId') raterId: string,
        @Body('userId') userId: string,
        @Body('score') score: number,
    ) {
        if(!channelId || !userId || !raterId || score === undefined) {
            throw new BadRequestException('channelId, raterId, userId, and score are required');
        }

        return this.ratingService.createRating(channelId, userId, raterId, score);
    }
}