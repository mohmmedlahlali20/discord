import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateChannelDto } from './dto/createChannel.dto';
import { Channel } from './schemas/channel.schema';

describe('Channel Controller', () => {
  let channelController: ChannelController;
  let channelService: ChannelService;

  const mockChannelService = {
    CreateChannel: jest.fn(),
    findAllChannel: jest.fn(),
    DeleteChannel: jest.fn(),
    deleteUserFromChannel: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [{ provide: ChannelService, useValue: mockChannelService }],
    }).compile();

    channelController = app.get<ChannelController>(ChannelController);
    channelService = app.get<ChannelService>(ChannelService);
  });

  describe("Creation d'un nouveau canal", () => {
    test('test creation un canal et renderer un message de success', async () => {
      const createChannelDto: CreateChannelDto = {
        Title: 'Sample Channel',
        members: ['5'],
        type: 'public',
        badWords: [],
      };

      const createdChannel: Channel = {
        ...createChannelDto,
      };

      mockChannelService.CreateChannel.mockResolvedValue(createdChannel);

      const response = await channelController.create(createChannelDto);

      expect(response).toEqual({
        message: 'Channel created successfully',
        channel: createdChannel,
      });
      expect(channelService.CreateChannel).toHaveBeenCalledWith(
        createChannelDto,
      );
      expect(channelService.CreateChannel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Recuperation de tous les canaux', () => {
    test('devrait retourner une liste de canaux', async () => {
      const channelList: Channel[] = [
        {
          Title: 'Channel 1',
          members: ['1', '2'],
          type: 'public',
          badWords: [],
        },
        { Title: 'Channel 2', members: ['3'], type: 'private', badWords: [] },
      ];

      mockChannelService.findAllChannel.mockResolvedValue(channelList);

      const response = await channelController.findAll();
      console.log(response);

      expect(response).toBe(channelList);
      expect(channelService.findAllChannel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Suppression dun canal', () => {
    test('devrait supprimer un canal et renvoyer un message de succes', async () => {
      const channelId = '12345';

      mockChannelService.DeleteChannel.mockResolvedValue({ deleted: true });

      const response = await channelController.delete(channelId);

      expect(response).toEqual({ message: 'Channel deleted successfully' });
      expect(channelService.DeleteChannel).toHaveBeenCalledWith(channelId);
      expect(channelService.DeleteChannel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Suppression users from channel', () => {
    const channelId = '12345';
    const userId = '5';
    test("devrait supprimer un user d'un canal et renvoyer un message de succès", async () => {
      mockChannelService.deleteUserFromChannel.mockResolvedValue(undefined);

      const response = await channelController.deleteUserFromChannel(
        userId,
        channelId,
      );

      expect(response).toEqual({
        message: 'User deleted from channel successfully',
      });
      expect(channelService.deleteUserFromChannel).toHaveBeenCalledWith(
        userId,
        channelId,
      );
      expect(channelService.deleteUserFromChannel).toHaveBeenCalledTimes(1);
    });

    test("user doesn't exist", async () => {
      mockChannelService.deleteUserFromChannel.mockResolvedValue({
        message: 'User not found in the channel',
      });

      const response = await channelController.deleteUserFromChannel(
        userId,
        channelId,
      );

      expect(response).toEqual({
        message: 'User not found in the channel',
      });
      expect(channelService.deleteUserFromChannel).toHaveBeenCalledWith(
        userId,
        channelId,
      );
      expect(channelService.deleteUserFromChannel).toHaveBeenCalledTimes(1);
    });
  });
});
