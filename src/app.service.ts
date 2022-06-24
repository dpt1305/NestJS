import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req: any): string {
    return 'Hello World!';
  }
}
