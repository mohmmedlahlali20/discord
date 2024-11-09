import { Test, TestingModule } from '@nestjs/testing';
import { TemporaryRoomService } from './temporary-room.service';

describe('TemporaryRoomService', () => {
  let service: TemporaryRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemporaryRoomService],
    }).compile();

    service = module.get<TemporaryRoomService>(TemporaryRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
