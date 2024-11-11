import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Rating, RatingDocument } from "./schemas/rating.schemas";



@Injectable()
export class RatingService {

        constructor(@InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>) {}

        async createRating(channelId: string, userId: string, raterId: string, score: number): Promise<Rating> {
            
            if(score < 1 || score > 5){
                throw new NotFoundException('Score Must Be Between 1 and 5');
            }
            const raterObjectId = new Types.ObjectId(raterId);


            let ratingDocument = await this.ratingModel.findOne({ channel: channelId, user: userId });

            if(ratingDocument){
                const existingRating = ratingDocument.ratings.find(r => r.raterId.toString() === raterId);

                if(existingRating) {
                    existingRating.score = score;
                } else {
                    ratingDocument.ratings.push({ raterId: raterObjectId, score});
                }

                ratingDocument.totalScore = ratingDocument.ratings.reduce((sum, rating) => sum + rating.score, 0)

                return ratingDocument.save();
            } else {
                ratingDocument = new this.ratingModel({
                    channel: channelId,
                    user: userId,
                    totalScore: score,
                    ratings: [{ raterId: raterObjectId, score }],
                });

            return ratingDocument.save();
        }
    }
}