import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { Jwtguard } from 'src/Auth/guard';

@UseGuards(Jwtguard)
@Controller('users')
export class UserController {
  constructor() {}
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
