import { LessonRepository } from './lesson.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
  ) {}
  create(createLessonDto: CreateLessonDto) {
    const { title, course } = createLessonDto;
    return this.lessonRepository.createLesson(title, course);
  }

  findAll() {
    return this.lessonRepository.findAllLessons();
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
