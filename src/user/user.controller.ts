import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { type Request } from "express";
import { Jwtguard } from "src/Auth/guard";


@Controller('users')
export class UserController {
    constructor(){}
    @UseGuards(Jwtguard)
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}