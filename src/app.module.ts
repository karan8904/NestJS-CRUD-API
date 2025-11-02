import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Auth/auth.controller';
import { AuthService } from './Auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
