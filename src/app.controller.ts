import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { UsersService } from './database/users/services/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}
  
  @Get('/chat')
  @UseGuards(JwtAuthGuard)
  public hello(@Res() res: Response) {
    const html = readFileSync(
      join(__dirname, '..', 'public', 'test.html'),
      'utf8',
    );
    res.setHeader('Content-Type', 'text/html');
    const users = this.usersService.findUser();

    res.send(html);
    res.send(users);
  }

  /*@Get('/users')
  async getUsers(@Res() res: Response) {
    const users = await this.usersService.findUser();
    res.send(users);
  }*/
}
