import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookmarkDto } from './dto/bookmarks.dto';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('create')
  createBookmark(@Body() dto: BookmarkDto) {
    return this.bookmarkService.createBookmark(dto);
  }

  @Delete('delete/:id')
  deleteBookmark(@Param('id') id: string) {
    return this.bookmarkService.deleteBookmark(id);
  }

  @Put('update')
  updateBookmark(@Body() dto: BookmarkDto) {
    return this.bookmarkService.updateBookmark(dto);
  }
}
