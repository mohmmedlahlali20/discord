import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { ChannelModule } from './channel/channel.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { RatingModule } from './rating/rating.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WebRtcModule } from './RTC/webrtc.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    FriendRequestModule,
    ChannelModule,
    ConversationModule,
    MessageModule,
    NotificationModule,
    RatingModule,
    WebRtcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
