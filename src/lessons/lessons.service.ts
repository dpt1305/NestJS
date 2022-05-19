import { CourseRepository } from './../courses/courses.repository';
import { CoursesService } from './../courses/courses.service';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { createQueryBuilder, DeleteResult } from 'typeorm';
import { commonUpdate } from 'src/helper/common-update';
// import { CoursesService}
@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    private coursesService: CoursesService,
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}
  async create(
    createLessonDto: CreateLessonDto,
    idCourse: string,
  ): Promise<Lesson> {
    try {
      const course = await this.coursesService.findOne(idCourse);
      const lesson = await this.lessonRepository.create({
        ...createLessonDto,
        course,
      });
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    return await this.lessonRepository.find();
  }

  async findOne(id: string) {
    const lesson = await this.lessonRepository.findOne({ id });
    if (!lesson) {
      throw new NotFoundException();
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    let lesson = await this.lessonRepository.findOne(id);
    if (!lesson) {
      throw new NotFoundException();
    }
    lesson = commonUpdate(lesson, updateLessonDto);
    await lesson.save();
    return lesson;
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.lessonRepository.delete(id);
    if (result.affected != 1) {
      throw new NotFoundException();
    }
    return result;
  }
}
