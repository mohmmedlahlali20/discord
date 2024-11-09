import { Module } from '@nestjs/common';
import { TemporaryRoomController } from './temporary-room.controller';
import { TemporaryRoomService } from './temporary-room.service';

@Module({
  controllers: [TemporaryRoomController],
  providers: [TemporaryRoomService]
})
export class TemporaryRoomModule {}
