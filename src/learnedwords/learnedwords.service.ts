import { UsersService } from './../users/users.service';
import { Learnedword } from './entities/learnedword.entity';
import { WordsService } from './../words/words.service';
import { LessonsService } from './../lessons/lessons.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LearnedwordsRepository } from './learnedwords.repository';
import { Injectable, RequestTimeoutException, NotFoundException } from '@nestjs/common';
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
    private usersService: UsersService,
  ) {}
  async create(createLearnedwordDto: CreateLearnedwordDto, user: User) {
    const { lessonId } = createLearnedwordDto;
    console.log(user.id);

    //# find all words by lesson id
    const allWords = await this.wordsService.findWordsByLesson(lessonId);

    //# update time out for user
    const updateTimeoutPromise = new Promise((resolve, reject) => {
      const date = new Date();
      date.setHours(date.getHours() + 10);

      this.usersService.updateTimeout(user, date);
    });

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
      Promise.all([...words, updateTimeoutPromise]);
      await runner.commitTransaction();
      return {
        code: 200,
        message: 'Success',
        data: 'Save learned words successfully.',
      };
    } catch (error) {
      await runner.rollbackTransaction();
    } finally {
      await runner.release();
    }
  }
  async createNewLearnedword(user: User, wordId: string) {
    const word = await this.wordsService.findOne(wordId);
    const date = new Date();
    const deadline = new Date(date.setHours(date.getHours() + 10));

    const learnedword = {
      user,
      word,
      interval: 0.4,
      repetition: 0,
      efactor: 2.5,
      deck: 0,
      deadline,
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

  async update(id: string, updateLearnedwordDto: UpdateLearnedwordDto) {
    const { interval, repetition, efactor, deck } = updateLearnedwordDto;
    
    const learnedword: Learnedword = await this.learnedwordsRepository.findOne({id});
    if (!learnedword) {
      throw new NotFoundException();
    }
    //# assign value
    learnedword.repetition = repetition;
    learnedword.interval = interval;
    learnedword.efactor = efactor;
    learnedword.deck = deck;

    //# update deadline
    const date = new Date();
    date.setDate(date.getDate() + interval);
    console.log(date);
    learnedword.deadline = date;

    //# save data
    await learnedword.save();

    return {
      code: 200,
      message: 'Success',
      data: learnedword,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} learnedword`;
  }
  async getReportForUser(user: User) {
    try {
      //# get query
      const query = await getConnection()
        .createQueryBuilder()
        .select('deck')
        .addSelect('COUNT(deck) AS count')
        .from(Learnedword, 'learnedword')
        .innerJoin('learnedword.user', 'user')
        .where('user.id = :id', { id: user.id })
        .groupBy('deck')
        .orderBy('deck', 'ASC')
        .execute();

      //# process data after query
      const data = [0, 0, 0, 0, 0, 0];
      query.forEach((el) => {
        const test = JSON.parse(JSON.stringify(el));
        console.log(test);
        data[test.deck] = +test.count;
      });

      //# return result
      return {
        code: 200,
        message: 'Success',
        data,
      };
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
