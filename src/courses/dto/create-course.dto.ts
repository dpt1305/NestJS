import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
