import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto/bookmarks.dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  async createBookmark(dto: BookmarkDto) {
    const id = dto.userId;
    if (isNaN(id)) {
      throw new BadRequestException('UserId must be numeric.');
    }
    const bookmark = await this.prismaService.bookmark.create({
      data: dto,
    });
    return {
      message: 'Bookmark created successfully',
      bookmark,
    };
  }

  async deleteBookmark(id: string) {
    const bookmarkId = Number(id);
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark with given id does not exist.');
    }
    await this.prismaService.bookmark.delete({ where: { id: bookmarkId } });
    return {
      message: 'Bookmark deleted successfully.',
    };
  }

  async updateBookmark(dto: BookmarkDto) {
    const { title, description, link, userId, id } = dto;
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: { id: id },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark with given id does not exist.');
    }
    const newBookmark = await this.prismaService.bookmark.update({
      where: { id: id },
      data: {
        title: title,
        link: link,
        description: description,
      },
    });

    return {
      message: 'Bookmark updated successfully.',
      newBookmark,
    };
  }
}
