import { CourseRepository } from './../courses/courses.repository';
import { CoursesService } from './../courses/courses.service';
import { LessonRepository } from './lesson.repository';
import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [TypeOrmModule.forFeature([LessonRepository, CourseRepository])],
})
export class LessonsModule {}
