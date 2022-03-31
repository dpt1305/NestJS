import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
