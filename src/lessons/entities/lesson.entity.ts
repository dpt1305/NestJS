import { Word } from './../../words/entities/word.entity';
import { Course } from './../../courses/entities/course.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// import { PrimaryGeneratedColumn}
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne((_) => Course, (course) => course.lessons)
  course: Course;

  @OneToMany(() => Word, (word) => word.lesson)
  word: Word;
}
