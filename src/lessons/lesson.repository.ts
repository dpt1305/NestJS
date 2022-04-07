// import { LessonRepository } from './lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  async createLesson(title: string, course: string) {

    const newLesson = this.create({ title, course });
    await this.save(newLesson);
    return newLesson;
  }
  async findAllLessons() {
    try {
      const lessons = await this.createQueryBuilder('lesson').getMany();
      console.log(lessons);
      return lessons;
    } catch (error) {
      throw new Error(error);
    }
  }
}
