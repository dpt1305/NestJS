import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLearnedwordDto {
  @ApiProperty()
  @IsString()
  lessonId: string;
}
