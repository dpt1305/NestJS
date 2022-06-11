import { LessonsService } from './../lessons/lessons.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { Word } from './entities/word.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsRepository)
    private wordsRepository: WordsRepository,
    private cloudinaryService: CloudinaryService,
    private lessonsService: LessonsService,
  ) {}
  /**
   * @param createWordDto CreateWordDto
   * @returns Word entity
   */
  async create(createWordDto: CreateWordDto, file: Express.Multer.File): Promise<Word> {
    console.log(createWordDto);
    
    const { word, meaning, type, example, pronunciation, placeholder, linkAudio, lessonId } = createWordDto;
    const lesson = await this.lessonsService.findOne(lessonId);
    const newWord = new Word();

    newWord.word = word;
    newWord.meaning = meaning;
    newWord.type = type;
    newWord.example = example;
    newWord.pronunciation = pronunciation;
    newWord.placeholder = placeholder;
    newWord.numberCharacter = word.length;
    newWord.linkAudio = linkAudio;
    newWord.lesson = lesson;

    //# upload image and get link
    const uploadFile = await this.cloudinaryService.uploadImage(file);
    newWord.linkImage = uploadFile.secure_url;

    return await newWord.save();
  }

  async findAll() {
    try {
      return await this.wordsRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findWordsByLesson(lessonId: string) {
    const words = await getConnection()
      .createQueryBuilder()
      // .select('word')
      .from(Word, 'word')
      .innerJoin('word.lesson', 'lesson')
      .where('word.lesson = :lessonId', { lessonId })
      .orderBy('word.word', 'ASC')
      .execute();
    if (!words) {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    try {
      const req = await this.wordsRepository.delete(id);

      if (req.affected) {
        return `This action removes a #${id} word`;
      }
      throw new BadRequestException('Can not delete this word.');
    } catch (error) {
      throw new BadRequestException('Can not delete this word.');
    }
  }

  async update(id: string, updateWordDto: UpdateWordDto, file: Express.Multer.File) {
    try {
      const word = await this.wordsRepository.findOne({ id });
      const newWord = {
        ...word,
        ...updateWordDto,
      };

      //# upload image and get link
      if(file) {
        const uploadFile = await this.cloudinaryService.uploadImage(file);
        newWord.linkImage = uploadFile.secure_url;
      }

      const req = await this.wordsRepository.save(newWord);
      return req;
    } catch (error) {
      throw new NotFoundException('Not found this word');
    }
  }
}
