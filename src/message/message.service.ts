import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { Channel, ChannelDocument } from '../channel/schemas/channel.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
  ) {}

  async sendMessage(
    channelId: string,
    userId: string,
    text: string,
  ): Promise<Message> {
    const channel = await this.channelModel.findById(channelId).exec();
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found`);
    }

    const newMessage = new this.messageModel({
      senderId: userId,
      text,
      channel: channelId,
      createdAt: new Date(),
    });

    return await newMessage.save();
  }

  async getMessageByChannelId(channelId: string): Promise<Message[]> {
    const channel = await this.channelModel.findById(channelId).exec();
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found`);
    }

    // Fetch and populate messages
    return this.messageModel
      .find({ channel: channelId })
      .populate('senderId', 'name email')
      .populate('channel', 'Title type')
      .exec();
  }
}
