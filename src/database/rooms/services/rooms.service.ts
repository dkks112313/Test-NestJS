import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/database/entity/Room';
import { Repository } from 'typeorm';

import {
  CreateRoomParams,
  UpdateRoomParams,
} from 'src/database/rooms/types/types';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  public findRoom() {
    return this.roomRepository.find();
  }

  public findRoomById(chat_id: number) {
    return this.roomRepository.findOne({
      where: {
        chat_id: chat_id,
      },
    });
  }

  public findRoomByName(chat_name: string) {
    return this.roomRepository.findOne({
      where: {
        chat_name: chat_name,
      },
    });
  }

  public async createRoom(createRoomDetails: CreateRoomParams) {
    const existingRoomByName = await this.findRoomByName(
      createRoomDetails.chat_name,
    );
    if (existingRoomByName) {
      throw new ConflictException('Room is already taken');
    }

    const newRoom = this.roomRepository.create({
      ...createRoomDetails,
      created_at: new Date(),
    });

    return this.roomRepository.save(newRoom);
  }

  public updateRoom(id: number, updateRoomDetails: UpdateRoomParams) {
    return this.roomRepository.update(id, { ...updateRoomDetails });
  }

  public deleteRoom(id: number) {
    return this.roomRepository.delete(id);
  }
}
