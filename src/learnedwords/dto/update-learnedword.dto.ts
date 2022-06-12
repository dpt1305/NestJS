import { PartialType } from '@nestjs/swagger';
import { CreateLearnedwordDto } from './create-learnedword.dto';

export class UpdateLearnedwordDto extends PartialType(CreateLearnedwordDto) {}
