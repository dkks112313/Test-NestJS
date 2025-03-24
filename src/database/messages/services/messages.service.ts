import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './../../entity/Message';
import { Repository } from 'typeorm';
import { CreateMessageParams, UpdateMessageParams } from '../types/types';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  public findMessage() {
    return this.messageRepository.find();
  }

  public findMessageById(message_id: number) {
    return this.messageRepository.findOne({
      where: {
        message_id: message_id,
      },
    });
  }

  public findMessageByChatId(chat_id: number) {
    return this.messageRepository.findOne({
      where: {
        chat_id: chat_id,
      },
    });
  }

  public async createMessage(createMessageDetails: CreateMessageParams) {
    const newMessage = this.messageRepository.create({
      ...createMessageDetails,
      created_at: new Date(),
    });

    return this.messageRepository.save(newMessage);
  }

  public updateMessage(
    message_id: number,
    updateMessageDetails: UpdateMessageParams,
  ) {
    return this.messageRepository.update(message_id, {
      ...updateMessageDetails,
    });
  }

  public deleteMessage(message_id: number) {
    return this.messageRepository.delete(message_id);
  }
}
