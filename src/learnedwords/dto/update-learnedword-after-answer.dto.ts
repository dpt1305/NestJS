import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateLearnedwordAfterAnswerDto {
  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  answer: boolean;
}
