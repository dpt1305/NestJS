import { SupermemoService } from './../supermemo/supermemo.service';
import { UpdateLearnedwordAfterAnswerDto } from './dto/update-learnedword-after-answer.dto';
import { UsersService } from './../users/users.service';
import { Learnedword } from './entities/learnedword.entity';
import { WordsService } from './../words/words.service';
import { LessonsService } from './../lessons/lessons.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LearnedwordsRepository } from './learnedwords.repository';
import {
  Injectable,
  RequestTimeoutException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateLearnedwordDto } from './dto/create-learnedword.dto';
import { UpdateLearnedwordDto } from './dto/update-learnedword.dto';
import { User } from 'src/users/entities/user.entity';
import { getConnection } from 'typeorm';
import { SupermemoItem } from 'src/supermemo/supermemo.service';
import {
  FormOfOneWord,
  UpdateAfterReviewDto,
} from './dto/update-after-review.dto';

@Injectable()
export class LearnedwordsService {
  constructor(
    @InjectRepository(LearnedwordsRepository)
    private learnedwordsRepository: LearnedwordsRepository,
    private wordsService: WordsService,
    private usersService: UsersService,
    private supermemoService: SupermemoService,
  ) {}
  async create(createLearnedwordDto: CreateLearnedwordDto, user: User) {
    const { lessonId } = createLearnedwordDto;

    //# find all words by lesson id
    const allWords = await this.wordsService.findWordsByLesson(lessonId);

    //# start transaction 
    const runner = getConnection().createQueryRunner();
    await runner.startTransaction();

    const promises = [];

    //# update timeout and learnedLesson in user
    const checkAddLearnedLesson = await this.usersService.addLearnedLesson(user, lessonId);
    if(!checkAddLearnedLesson) {
      throw new ConflictException();
    }
    
    const updateUserPromise = async () => {
      const date = new Date();
      date.setHours(date.getHours() + 10);

      this.usersService.addLearnedLesson(user, lessonId);
      this.usersService.updateTimeout(user, date);
    };
    promises.push(updateUserPromise());

    //# create all promise
    let words = [];
    if (allWords.data) {
      words = allWords.data.map((el) => {
        return this.promiseCreateLearnedword(user, el.id);
      });
    }
    promises.push(...words);
    try {
      //# success
      await Promise.all(promises);
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
  async promiseCreateLearnedword(user: User, wordId: string) {
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
    this.learnedwordsRepository.save(learnedword);
    // return new Promise((resolve, reject) => {
    //   this.learnedwordsRepository.save(learnedword);
    // });
  }
  findAll() {
    return `This action returns all learnedwords`;
  }
  async findOne(id: string) {
    const learnedword = await this.learnedwordsRepository.findOne(id);
    if (!learnedword) {
      throw new NotFoundException();
    }
    return learnedword;
  }
  async getWrongAnswer(id) {
    const wrongWords = await this.wordsService.findAll();
    const result = wrongWords.map((el) => {
      if(el.id != id) {
        return el;
      }
    });
    console.log(result);
    return result;
    
  }

  async update(id: string, updateLearnedwordDto: UpdateLearnedwordDto) {
    const { interval, repetition, efactor, deck } = updateLearnedwordDto;

    const learnedword: Learnedword = await this.learnedwordsRepository.findOne({
      id,
    });
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

  async updateAfterAnswer(
    id: string,
    updateLearnedwordAfterAnswerDto: UpdateLearnedwordAfterAnswerDto,
  ) {
    try {
      const learnedword: Learnedword = await this.findOne(id);

      if (!learnedword) {
        throw new NotFoundException();
      }

      //# get all infor
      let { interval, repetition, efactor, deadline, deck } = learnedword;
      const { answer } = updateLearnedwordAfterAnswerDto;
      //# process infor before run SM-2
      let item: SupermemoItem = {
        interval,
        repetition,
        efactor,
      };

      //# run SM-2
      if (!deck) {
        deck = 1;
        item = this.supermemoService.supermemo(item, deck);
      }
      if (answer && deck) {
        deck = deck == 5 ? 5 : deck + 1;
        item = this.supermemoService.supermemo(item, deck);
      }
      if (!answer && deck) {
        deck = deck == 1 ? 1 : deck - 1;
        item = this.supermemoService.supermemo(item, deck);
      }

      //# save data
      learnedword.deck = deck;
      learnedword.interval = item.interval;
      learnedword.repetition = item.repetition;
      learnedword.efactor = item.efactor;

      //# update deadline
      const date = new Date();
      date.setDate(date.getDate() + item.interval);
      learnedword.deadline = date;

      learnedword.save();
    } catch (error) {
      return error.response;
    }
  }

  async getWordForReview(user: User) {
    const timeNow = new Date();
    const checkTimeout = timeNow > user.timeout;

    if (!checkTimeout) {
      throw new BadRequestException();
    }

    const query = await getConnection()
      .createQueryBuilder()
      .select('word')
      .addSelect('learnedword.id')
      .from(Learnedword, 'learnedword')
      .innerJoin('learnedword.word', 'word')
      .innerJoin('learnedword.user', 'user')
      .where('learnedword.deadline < :timeNow', { timeNow })
      .andWhere('user.id = :id', { id: user.id })
      .execute();
    return {
      code: 200,
      message: 'Success',
      data: query,
    };
  }
  async getTheFirstLearnedword(user: User) {
    const query = await getConnection()
      .createQueryBuilder()
      .select('learnedword.deadline')
      .from(Learnedword, 'learnedword')
      .where('learnedword.userId = :id', { id: user.id })
      .orderBy('learnedword.deadline', 'ASC')
      // .take(1)
      .limit(1)
      .execute();
    return query[0].learnedword_deadline;
  }

  async updateAfterAnswer2(
    updateAfterReviewDto: UpdateAfterReviewDto,
    user: User,
  ) {
    const { result } = updateAfterReviewDto;

    //# save learned word into db
    const runner = getConnection().createQueryRunner();
    await runner.startTransaction();
    try {
      //# success
      const arrayPromise = result.map((el) => {
        return this.updateAfterAnswer(el.id, { answer: el.answer });
      });
      await Promise.all(arrayPromise);

      //# save user timeout
      const timeout = await this.getTheFirstLearnedword(user);
      await this.usersService.updateTimeout(user, timeout);

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
}
