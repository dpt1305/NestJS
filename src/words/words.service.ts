import { InjectRepository } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { Word } from './entities/word.entity';
import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsRepository)
    private wordsRepository: WordsRepository,
  ) {}
  /**
   * @param createWordDto CreateWordDto
   * @returns Word entity
   */
  async create(createWordDto: CreateWordDto): Promise<Word> {
    const { word, meaning, type, example, pronunciation, placeholder } = createWordDto;

    const newWord = new Word();

    newWord.word = word;
    newWord.meaning = meaning;
    newWord.type = type;
    newWord.example = example;
    newWord.pronunciation = pronunciation;
    newWord.placeholder = placeholder;

    return await newWord.save();

  }

  findAll() {
    return `This action returns all words`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: string, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: string) {
    return `This action removes a #${id} word`;
  }
}
