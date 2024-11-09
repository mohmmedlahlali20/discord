import { Test, TestingModule } from '@nestjs/testing';
import { TemporaryRoomController } from './temporary-room.controller';

describe('TemporaryRoomController', () => {
  let controller: TemporaryRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemporaryRoomController],
    }).compile();

    controller = module.get<TemporaryRoomController>(TemporaryRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
