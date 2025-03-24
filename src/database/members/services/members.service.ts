import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMember } from './../../entity/ChatMember';
import { CreateMemberParams, UpdateMemberParams } from '../types/types';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(ChatMember)
    private chatMemberRepository: Repository<ChatMember>,
  ) {}

  public findMember() {
    return this.chatMemberRepository.find();
  }

  public findMemberByChatId(chat_id: number) {
    return this.chatMemberRepository.findOne({
      where: {
        chat_id: chat_id,
      },
    });
  }

  public findMemberByUserId(user_id: number) {
    return this.chatMemberRepository.findOne({
      where: {
        user_id: user_id,
      },
    });
  }

  public async createMember(createMemberDetails: CreateMemberParams) {
    const newMember = this.chatMemberRepository.create({
      ...createMemberDetails,
      joined_at: new Date(),
    });

    return this.chatMemberRepository.save(newMember);
  }

  public updateMember(id: number, updateMemberDetails: UpdateMemberParams) {
    return this.chatMemberRepository.update(id, {
      ...updateMemberDetails,
    });
  }

  public deleteMember(id: number) {
    return this.chatMemberRepository.delete(id);
  }
}
