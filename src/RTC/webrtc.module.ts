import { Module } from '@nestjs/common';
import { WebRtcGateway } from './webrtc.gateway';
import { WebRtcService } from './webrtc.service';
import { WebRtcController } from './webrtc.controller';

@Module({
  providers: [WebRtcGateway, WebRtcService],
  controllers: [WebRtcController]
})
export class WebRtcModule {}
