import { CourseRepository } from './../courses/courses.repository';
import { CoursesService } from './../courses/courses.service';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { createQueryBuilder } from 'typeorm';
// import { CoursesService}
@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}
  async create(
    createLessonDto: CreateLessonDto,
    idCourse: string,
  ): Promise<Lesson> {
    const { title } = createLessonDto;

    const course = await this.courseRepository.findCourseById(idCourse);

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
