import { Module } from '@nestjs/common';
import { SupermemoService } from './supermemo.service';

@Module({
  controllers: [],
  providers: [SupermemoService],
  exports: [SupermemoService],
})
export class SupermemoModule {}
