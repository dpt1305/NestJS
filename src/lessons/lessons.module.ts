import { LessonRepository } from './lesson.repository';
import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [TypeOrmModule.forFeature([LessonRepository])],
})
export class LessonsModule {}
