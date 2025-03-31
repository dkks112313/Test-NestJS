import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dtos/CreateMessage.dto';
import { UpdateMessageDto } from '../dtos/UpdateMessage.dto';

@Controller('message')
export class MessagesController {
    constructor(private messageService: MessagesService) {}

    @Get()
    public getMessage() {
        return this.messageService.findMessage();
    }

    @Get('name/:id')
    public getMemberById(@Param('id', ParseIntPipe) id: number) {
        return this.messageService.findMessageById(id)
    }

    @Get(':id')
    public getMessageByChatId(@Param('chat_id', ParseIntPipe) id: number) {
        return this.messageService.findMessageByChatId(id)
    }

    @Post()
    public createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.createMessage(createMessageDto);
    }

    @Put(':id')
    public async updateMessageById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        await this.messageService.updateMessage(id, updateMessageDto);
    }

    @Delete(':id')
    public async deleteMessageById(@Param('id', ParseIntPipe) id: number) {
        await this.messageService.deleteMessage(id);
    }
}
