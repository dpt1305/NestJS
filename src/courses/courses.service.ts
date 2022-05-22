import { User } from './../users/entities/user.entity';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './courses.repository';
import { getConnection } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    console.log(createCourseDto);
    const newCourse = await this.courseRepository.create({
      ...createCourseDto,
    });
    return await this.courseRepository.save(newCourse);
  }

  async findAll() {
    // return await this.courseRepository.find();
    const result = await getConnection()
      .createQueryBuilder()
      // .select('course')
      .from(Course, 'course')
      .orderBy('course.title', 'ASC')
      .execute();
    console.log(result);
    return result;
    
  }

  async findOne(id: string) {
    return await this.courseRepository.findOne(id);
  }

  findLessonsByCourse(id: string) {
    return this.courseRepository.findLessonsByCourse(id);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);
    return await this.courseRepository.save({
      ...course,
      ...updateCourseDto,
    });
  }

  async remove(id: string) {
    return await this.courseRepository.delete({ id });
  }
}
