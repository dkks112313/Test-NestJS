import {
  CreateUserParams,
  UpdateUserParams,
} from '../../users/types/types';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public findUser() {
    return this.userRepository.find();
  }

  public findUserById(user_id: number) {
    return this.userRepository.findOne({
      where: {
        user_id: user_id,
      },
    });
  }

  public findUserByName(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  public findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  public async createUser(createUserDetails: CreateUserParams) {
    const existingUserByName = await this.findUserByName(
      createUserDetails.username,
    );
    if (existingUserByName) {
      throw new ConflictException('Username is already taken');
    }

    const existingUserByEmail = await this.findUserByEmail(
      createUserDetails.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email is already taken');
    }

    const newUser = this.userRepository.create({
      ...createUserDetails,
      created_at: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  public updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update(id, { ...updateUserDetails });
  }

  public deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
