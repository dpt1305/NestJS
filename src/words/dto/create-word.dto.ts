import { WordType } from './../entities/word.entity';
import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class CreateWordDto {
  @ApiProperty()
  @IsString()
  word: string;

  @ApiProperty()
  @IsString()
  meaning: string;

  @ApiProperty()
  @IsEnum(WordType)
  type: WordType;

  @ApiProperty()
  @IsString()
  example: string;

  @ApiProperty()
  @IsString()
  pronunciation: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;

  numberCharacter: number;

  @ApiProperty()
  @IsString()
  placeholder: string;

  @ApiProperty()
  @IsString()
  lessonId: string;

  @ApiProperty()
  @IsString()
  linkAudio: string;
}
