import { Module } from '@nestjs/common';
import { MembersController } from './controllers/members.controller';
import { MembersService } from './services/members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMember } from '../entity/ChatMember';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMember])],
  exports: [MembersService],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
