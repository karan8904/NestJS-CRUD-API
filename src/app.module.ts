import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Auth/auth.controller';
import { AuthService } from './Auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './Auth/auth.module';
import { UserController } from './user/user.controller';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [
    AppController,
    AuthController,
    UserController,
    BookmarkController,
  ],
  providers: [AppService, AuthService, BookmarkService],
})
export class AppModule {}
