import { CourseRepository } from './../courses/courses.repository';
import { CoursesService } from './../courses/courses.service';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { createQueryBuilder, DeleteResult, getConnection } from 'typeorm';
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
  ): Promise<Lesson> {
    try {
      const { title, idCourse } = createLessonDto;
      const course = await this.coursesService.findOne(idCourse);
      const lesson = await this.lessonRepository.create({
        title,
        course,
      });
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return {
        code : 200,
        message: 'Success',
        data: await this.lessonRepository.find(),
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    const lesson = await this.lessonRepository.findOne({ id });
    if (!lesson) {
      throw new NotFoundException();
    }
    return lesson;
  }

  async findLessonsByCourseId(id: string) {
    // const lesson = await this.lessonRepository.findOne({ id });
    const lessons = await getConnection()
      .createQueryBuilder()
      .select('lesson')
      .from(Lesson, 'lesson')
      // .innerJoin('lesson.course', 'course')
      .where('lesson.course = :id', { id })
      .execute();
    if (!lessons) {
      throw new NotFoundException();
    }
    return {
      code: 200,
      message: 'Success',
      data: lessons,
    };
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
