import { Lesson } from './../lessons/entities/lesson.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Course } from './entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async createCourse(createCourseDto: CreateCourseDto) {
    const { title, description } = createCourseDto;

    const newCourse = this.create({ title, description});
    await this.save(newCourse);
    return newCourse;
  }
  async findCourseById(id: string): Promise<Course> {
    try {
      const course = await this.createQueryBuilder('course')
        .where({ id })
        .getOne();
      return course;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getCourses() {
    try {
      const courses = await this.createQueryBuilder('course').getMany();

      return courses;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findLessonsByCourse(id: string) {
    try {
      const lessons = await this.createQueryBuilder()
        .select('lesson')
        .from(Lesson, 'lesson')
        .where('lesson.course = :id', { id })
        .getMany();
      console.log(lessons);
      return lessons;
    } catch (error) {
      throw new Error(error);
    }
  }
}
