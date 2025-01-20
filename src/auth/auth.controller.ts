import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new UnauthorizedException('Invalid login or password');
    }
    return this.authService.login(user);
  }
}
