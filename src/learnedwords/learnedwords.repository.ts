import { InjectRepository } from '@nestjs/typeorm';
import { Learnedword } from './entities/learnedword.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Learnedword)
export class LearnedwordsRepository extends Repository<Learnedword> {}
