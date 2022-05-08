import { Word } from './entities/word.entity';
import { EntityRepository, Repository } from 'typeorm';
@EntityRepository(Word)
export class WordsRepository extends Repository<Word> {}
