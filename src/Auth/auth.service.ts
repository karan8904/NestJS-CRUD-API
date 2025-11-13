import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async registerUser(dto: AuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });
      const token = await this.signToken(user.id, user.email);

      return { message: 'User registered.', token: token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already registered.');
        }
      }
      throw error;
    }
  }

  async loginUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'Email not registerd. Please register first.',
      );

    const isCorrectPw = await bcrypt.compare(dto.password, user.password);
    if (!isCorrectPw) throw new ForbiddenException('Password is incorrect.');

    const token = await this.signToken(user.id, user.email);

    return { message: 'User logged in successfully.', token: token };
  }

  signToken(userId: number, email: string): Promise<string> {
    return this.jwt.signAsync(
      {
        id: userId,
        email: email,
      },
      {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
