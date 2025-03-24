import { Module } from '@nestjs/common';
import { MessagesService } from './services/messages.service';
import { MessagesController } from './controller/messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entity/Message';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  exports: [MessagesService],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
