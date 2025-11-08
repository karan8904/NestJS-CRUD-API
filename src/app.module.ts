import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Auth/auth.controller';
import { AuthService } from './Auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './Auth/auth.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule {}
