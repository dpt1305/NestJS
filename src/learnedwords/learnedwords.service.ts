import { WordsService } from './../words/words.service';
import { LessonsService } from './../lessons/lessons.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LearnedwordsRepository } from './learnedwords.repository';
import { Injectable } from '@nestjs/common';
import { CreateLearnedwordDto } from './dto/create-learnedword.dto';
import { UpdateLearnedwordDto } from './dto/update-learnedword.dto';
import { User } from 'src/users/entities/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class LearnedwordsService {
  constructor(
    @InjectRepository(LearnedwordsRepository)
    private learnedwordsRepository: LearnedwordsRepository,
    private wordsService: WordsService,
  ) {}
  async create(createLearnedwordDto: CreateLearnedwordDto, user: User) {
    const { lessonId } = createLearnedwordDto;
    console.log(user.id);

    //# find all words by lesson id
    const allWords = await this.wordsService.findWordsByLesson(lessonId);

    //# create all promise
    let words;
    if (allWords.data) {
      words = allWords.data.map((el) => {
        return this.createNewLearnedword(user, el.word_id);
        // new Promise(this.learnedwordsRepository.save()
      });
    }

    //# save learned word into db
    const runner = getConnection().createQueryRunner();
    await runner.startTransaction();
    try {
      //# success
      Promise.all(words);
      await runner.commitTransaction();
      return {
        code: 200,
        message: 'Success',
        data: 'Save learned words successfully.',
      };
    }
    catch (error) {
      await runner.rollbackTransaction();
    }
    finally {
      await runner.release();
    }
  }
  async createNewLearnedword(user: User, wordId: string) {
    const word = await this.wordsService.findOne(wordId);

    const learnedword = {
      user,
      word,
      interval: 0,
      repetition: 0,
      efactor: 2.5,
      deck: 0,
    };
    return new Promise((resolve, reject) => {
      this.learnedwordsRepository.save(learnedword);
    });
  }
  findAll() {
    return `This action returns all learnedwords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learnedword`;
  }

  update(id: number, updateLearnedwordDto: UpdateLearnedwordDto) {
    return `This action updates a #${id} learnedword`;
  }

  remove(id: number) {
    return `This action removes a #${id} learnedword`;
  }
}
