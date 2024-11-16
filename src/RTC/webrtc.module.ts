import { Module } from '@nestjs/common';
import { WebRtcGateway } from './webrtc.gateway';
import { WebRtcService } from './webrtc.service';
import { WebRtcController } from './webrtc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../message/schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [WebRtcGateway, WebRtcService],
  controllers: [WebRtcController],
})
export class WebRtcModule {}
