import { Course } from './../../courses/entities/course.entity';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLessonDto {
  @IsString()
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsString()
  idCourse: string;
}
