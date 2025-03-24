import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';

import { RoomsService } from 'src/database/rooms/services/rooms.service';
import { CreateRoomDto } from 'src/database/rooms/dtos/CreateRoom.dto';
import { UpdateRoomDto } from 'src/database/rooms/dtos/UpdateRoom.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @Get()
  public getRooms() {
    return this.roomService.findRoom();
  }

  @Get(':id')
  public getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.findRoomById(id);
  }

  @Get('name/:name')
  public getRoomByName(@Param('name') name: string) {
    return this.roomService.findRoomByName(name);
  }

  @Post()
  public createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @Put(':id')
  public async updateRoomById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    await this.roomService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id')
  public async deleteRoomById(@Param('id', ParseIntPipe) id: number) {
    await this.roomService.deleteRoom(id);
  }
}
