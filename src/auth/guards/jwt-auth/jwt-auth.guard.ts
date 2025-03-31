import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Пробуем получить токен из кук
    let token = request.cookies?.jwt;
  
    // Если в куках нет, пробуем распарсить заголовок вручную
    if (!token && request.headers.cookie) {
      const cookies = request.headers.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});
      token = cookies['jwt'];
    }
  
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
  
    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
