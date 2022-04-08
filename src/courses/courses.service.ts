import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.createCourse(createCourseDto);
  }

  findAll() {
    return this.courseRepository.getCourses();
  }

  findOne(id: string): Promise<Course> {
    return this.courseRepository.findCourseById(id);
  }

  findLessonsByCourse(id: string) {
    return this.courseRepository.findLessonsByCourse(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
