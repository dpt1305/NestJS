import { IsNotEmpty, IsString } from 'class-validator';

export class GetTaskFilterDto {
  // @IsString()
  title: string;

  // @IsString()
  status: string;
}
