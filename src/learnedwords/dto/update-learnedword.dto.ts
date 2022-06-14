import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsInt, IsNumber } from 'class-validator';
import { CreateLearnedwordDto } from './create-learnedword.dto';

export class UpdateLearnedwordDto {
  @IsInt()
  @ApiProperty({ type: 'number' })
  interval: number;
  
  @IsNumber()
  @ApiProperty({ type: 'number' })
  repetition: number;
  
  @IsNumber()
  @ApiProperty({ type: 'number' })
  efactor: number;
  
  @IsNumber()
  @ApiProperty({ type: 'number' })
  deck: number;

  // @IsDate()
  // deadline: Date;
}
