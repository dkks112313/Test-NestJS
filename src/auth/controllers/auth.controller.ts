import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  Response,
} from '@nestjs/common';

import { AuthService } from 'src/auth/services/auth.service';
import { AuthInput } from 'src/auth/types/types';
import { CreateUserDto } from 'src/database/users/dtos/CreateUser.dto';
import { Response as ExpressResponse } from 'express';
import { join } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  public getLoginPage(@Response() res: ExpressResponse) {
    return res.sendFile(
      join(__dirname, '..', '..', '..', 'public', 'login.html'),
    );
  }

  @Get('register')
  public getRegistrationPage(@Response() res: ExpressResponse) {
    return res.sendFile(
      join(__dirname, '..', '..', '..', 'public', 'register.html'),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(@Body() input: AuthInput, @Response() res: ExpressResponse) {
    const authResult = await this.authService.authenticate(input);

    res.cookie('jwt', authResult.accessToken, {
      httpOnly: true,
      secure: false, // true в production (HTTPS)
      maxAge: 86400000, // срок действия (1 день)
    });

    return res.json({ message: 'Login successful' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  public async registration(@Body() input: CreateUserDto, @Response() res: ExpressResponse) {
    const authResult = await this.authService.registration(input);

    res.cookie('jwt', authResult.accessToken, {
      httpOnly: true,
      secure: false, // true в production (HTTPS)
      maxAge: 86400000, // срок действия (1 день)
    });
    
    return res.json({ message: 'Registration successful' });
  }
}
