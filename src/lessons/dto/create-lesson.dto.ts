import { Course } from './../../courses/entities/course.entity';
import { IsString } from 'class-validator';
export class CreateLessonDto {
  @IsString()
  title: string;

  // @IsString()
  // idCourse: string;
}
