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

  async createBookmark(dto: BookmarkDto, userId: number) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    });
    return {
      message: 'Bookmark created successfully',
      bookmark,
    };
  }

  async deleteBookmark(id: string, userId: number) {
    const bookmarkId = Number(id);
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark with given id does not exist.');
    }
    await this.prismaService.bookmark.delete({
      where: { id: bookmarkId, userId },
    });
    return {
      message: 'Bookmark deleted successfully.',
    };
  }

  async updateBookmark(dto: BookmarkDto, userId: number) {
    const { title, description, link, id } = dto;
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: { id, userId },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark with given id does not exist.');
    }
    const newBookmark = await this.prismaService.bookmark.update({
      where: { id, userId },
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
