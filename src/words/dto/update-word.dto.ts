import { IsEnum, IsOptional } from 'class-validator';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateWordDto } from './create-word.dto';
import { WordType } from '../entities/word.entity';

export class UpdateWordDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  word: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meaning: string;
  
  @IsOptional()
  @IsEnum(WordType)
  @ApiProperty({ enum: WordType, default: WordType.Noun, required: false })
  type: WordType;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  example: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pronunciation: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image: Express.Multer.File;

  numberCharacter: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  placeholder: string;
  
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  lessonId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  linkAudio: string;
}
