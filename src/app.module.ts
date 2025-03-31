import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './database/entity/User';

import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from './app/app.gateway';
import { Room } from './database/entity/Room';
import { UsersModule } from './database/users/users.module';
import { RoomsModule } from './database/rooms/rooms.module';
import { MembersModule } from './database/members/members.module';
import { MessagesModule } from './database/messages/messages.module';
import { ChatMember } from './database/entity/ChatMember';
import { Message } from './database/entity/Message';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/auth*', '/chat*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Room, ChatMember, Message],
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    MembersModule,
    MessagesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
