import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthInput, SingInData, AuthResult } from 'src/auth/types/types';
import { CreateUserDto } from 'src/database/users/dtos/CreateUser.dto';
import { UsersService } from 'src/database/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async registration(input: CreateUserDto): Promise<AuthResult> {
    if (input.password !== input.confirmPassword) {
      throw new UnauthorizedException();
    }

    const newUser = await this.userService.createUser({
      username: input.username,
      email: input.email,
      password: input.password,
    });
    if (!newUser) {
      throw new UnauthorizedException();
    }

    const singData = {
      user_id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
    };

    const accessToken = await this.generateJWT(singData);

    return {
      accessToken: accessToken.accessToken,
      user_id: accessToken.user_id,
      username: accessToken.username,
      email: accessToken.email,
    };
  }

  public async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  private async validateUser(input: AuthInput): Promise<SingInData | null> {
    const user = await this.userService.findUserByEmail(input.email);

    if (
      user &&
      user.password === input.password &&
      user.email === input.email
    ) {
      return {
        user_id: Number(user.user_id),
        username: user.username,
        email: user.email,
      };
    }

    return null;
  }

  private async signIn(user: SingInData): Promise<AuthResult> {
    const jwt = await this.generateJWT(user);
    return jwt;
  }

  private async generateJWT(user: SingInData) {
    const tokenPayload = {
      sub: user.user_id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken: accessToken,
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };
  }
}
