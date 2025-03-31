import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MembersService } from '../services/members.service';
import { CreateMemberDto } from '../dtos/CreateMember.dto';
import { UpdateMemberDto } from '../dtos/UpdateMember.dto';

@Controller('members')
export class MembersController {
    constructor(private memberService: MembersService) {}

    @Get()
    public getMember() {
        return this.memberService.findMember();
    }

    @Get(':id')
    public getMemberByChatId(@Param('chat_id', ParseIntPipe) id: number) {
        return this.memberService.findMemberByChatId(id)
    }

    @Get('name/:name')
    public getMemberByUserId(@Param('chat_id', ParseIntPipe) id: number) {
        return this.memberService.findMemberByUserId(id)
    }

    @Post()
    public createMember(@Body() createRoomDto: CreateMemberDto) {
        return this.memberService.createMember(createRoomDto);
    }

    @Put(':id')
    public async updateMemberById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMemberDto: UpdateMemberDto,
    ) {
        await this.memberService.updateMember(id, updateMemberDto);
    }

    @Delete(':id')
    public async deleteMemberById(@Param('id', ParseIntPipe) id: number) {
        await this.memberService.deleteMember(id);
    }
}