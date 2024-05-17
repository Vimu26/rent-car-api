import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SignUpDto } from '../dtos/signUp.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth/auth.service';
import { getUsersQueryDTO } from '../dtos/getUsers.query.dto';
import { JwtAuthGuard } from '../auth.guard';
// import { PublicGuard } from '../public.guard';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Query() queryParams: getUsersQueryDTO) {
    return await this.authService.getUsers(queryParams);
  }

  @Post('oauth/register')
  async signUp(@Body() requestBody: SignUpDto) {
    return await this.authService.signUp(requestBody);
  }

  @Post('oauth/login')
  async signIn(@Body() requestBody: LoginDto) {
    return await this.authService.signIn(requestBody);
  }
}
