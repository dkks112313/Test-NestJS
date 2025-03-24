import { Module } from '@nestjs/common';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/database/entity/Room';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService],
  exports: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
