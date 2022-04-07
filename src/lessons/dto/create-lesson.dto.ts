import { IsString } from 'class-validator';
export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  course: string;
}
