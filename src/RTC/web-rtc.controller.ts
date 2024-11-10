import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebRtcService } from './web-rtc.service';


@Controller('webRTC')
export class WebRtcController {
  constructor(private readonly webRtcService: WebRtcService) {}


}
