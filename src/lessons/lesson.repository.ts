import { CourseRepository } from './../courses/courses.repository';
import { Course } from './../courses/entities/course.entity';
// import { LessonRepository } from './lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository, EntityRepository, createQueryBuilder } from 'typeorm';
// import { CourseRepository}
@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  async createLesson(title: string, course: Course) {
    const newLesson = this.create({ title, course });
    await this.save(newLesson);
    return newLesson;
  }
  async findOneCourse(idCourse: string) {
    const course = await this.createQueryBuilder('course')
      .where('id = :id', { idCourse })
      .getOne();
    return course;
  }
  async findAllLessons() {
    try {
      const lessons = await this.createQueryBuilder('lesson').getMany();
      return lessons;
    } catch (error) {
      throw new Error(error);
    }
  }
}
