import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../dtos/signUp.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth/auth.service';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signUp(@Body() requestBody: SignUpDto): Promise<{ user: SignUpDto }> {
    return await this.authService.signUp(requestBody);
  }

  @Post('/login')
  async signIn(@Body() requestBody: LoginDto): Promise<{ token: string }> {
    return await this.authService.signIn(requestBody);
  }
}
