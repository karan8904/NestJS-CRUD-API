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
import { GetUser } from 'src/Auth/decorator/get-user.decorator';

@UseGuards(Jwtguard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('create')
  createBookmark(@Body() dto: BookmarkDto, @GetUser('id') userId: number) {
    return this.bookmarkService.createBookmark(dto, userId);
  }

  @Delete('delete/:id')
  deleteBookmark(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.bookmarkService.deleteBookmark(id, userId);
  }

  @Put('update')
  updateBookmark(@Body() dto: BookmarkDto, @GetUser('id') userId: number) {
    return this.bookmarkService.updateBookmark(dto, userId);
  }
}
