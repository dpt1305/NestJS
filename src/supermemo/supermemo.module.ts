import { Module } from '@nestjs/common';
import { SupermemoService } from './supermemo.service';

@Module({
  controllers: [],
  providers: [SupermemoService],
})
export class SupermemoModule {}
