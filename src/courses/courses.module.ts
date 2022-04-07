import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from './courses.repository';
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [TypeOrmModule.forFeature([CourseRepository])],
})
export class CoursesModule {}
