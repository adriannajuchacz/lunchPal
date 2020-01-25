import { Controller, Get, UseGuards, Post, UsePipes, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../providers/user-provider/user-service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
