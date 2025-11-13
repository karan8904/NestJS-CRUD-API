import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { type User } from 'generated/prisma/client';
import { GetUser } from 'src/Auth/decorator/get-user.decorator';
import { Jwtguard } from 'src/Auth/guard';

@UseGuards(Jwtguard)
@Controller('users')
export class UserController {
  constructor() {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
