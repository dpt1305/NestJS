import { ApiProperty } from "@nestjs/swagger";

export class FormOfOneWord {
  id: string;
  answer: true;
}
export class UpdateAfterReviewDto {
  @ApiProperty({ type: 'array' })
  result: [FormOfOneWord];
}
