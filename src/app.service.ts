import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req: any): string {
    console.log(req);

    return 'Hello World!';
  }
}
