import { Controller, Post, Body, Param } from '@nestjs/common';

@Controller('webrtc')
export class WebRtcController {
  @Post('offer/:to')
  async handleOffer(
    @Param('to') to: string,
    @Body() offerData: { offer: RTCSessionDescriptionInit },
  ) {
    console.log(`Received offer for ${to}:`, offerData);
    return { status: 'Offer received', to, offer: offerData.offer };
  }

  @Post('answer/:to')
  async handleAnswer(
    @Param('to') to: string,
    @Body() answerData: { answer: RTCSessionDescriptionInit },
  ) {
    console.log(`Received answer for ${to}:`, answerData);
    return { status: 'Answer received', to, answer: answerData.answer };
  }

  @Post('ice-candidate/:to')
  async handleIceCandidate(
    @Param('to') to: string,
    @Body() candidateData: { candidate: RTCIceCandidate },
  ) {
    console.log(`Received ICE candidate for ${to}:`, candidateData);
    return { status: 'ICE candidate received', to, candidate: candidateData.candidate };
  }
}
