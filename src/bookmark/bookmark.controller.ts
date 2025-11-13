import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookmarkDto } from './dto/bookmarks.dto';
import { BookmarkService } from './bookmark.service';
import { Jwtguard } from 'src/Auth/guard';
import { type Request } from 'express';
import { User } from 'generated/prisma/client';

@UseGuards(Jwtguard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('create')
  createBookmark(@Body() dto: BookmarkDto, @Req() req: Request) {
    const userId = (req.user as User).id;
    return this.bookmarkService.createBookmark(dto, userId);
  }

  @Delete('delete/:id')
  deleteBookmark(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as User).id;
    return this.bookmarkService.deleteBookmark(id, userId);
  }

  @Put('update')
  updateBookmark(@Body() dto: BookmarkDto, @Req() req: Request) {
    const userId = (req.user as User).id;
    return this.bookmarkService.updateBookmark(dto, userId);
  }
}
