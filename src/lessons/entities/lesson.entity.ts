import { Word } from './../../words/entities/word.entity';
import { Course } from './../../courses/entities/course.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Entity,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { PrimaryGeneratedColumn}
@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne((_) => Course, (course) => course.lessons)
  course: Course;

  @OneToMany(() => Word, (word) => word.lesson)
  word: Word;
}
