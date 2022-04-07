import { CreateCourseDto } from './dto/create-course.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Course } from './entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async createCourse(createCourseDto: CreateCourseDto) {
    const { title, description } = createCourseDto;

    const newCourse = this.create({ title, description });
    await this.save(newCourse);
    return newCourse;
  }
  async getCourses() {
    try {
      const courses = await this.createQueryBuilder('course').getMany();
      // .where('user.name = :name', { name: 'John' })
      // const courses = await this.courseRepository.findAll();

      return courses;
    } catch (error) {
      throw new Error(error);
    }
  }
}
