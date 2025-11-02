import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { Message: string } {
    return { Message: 'Hello World!' };
  }
}
