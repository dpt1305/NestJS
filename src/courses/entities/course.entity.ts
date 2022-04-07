import { Lesson } from './../../lessons/entities/lesson.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
// import {Column}
// import { Lesson}
@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  // @Column('varchar')
  // @OneToMany(() => Lesson, (lesson) => lesson.course)
  // @JoinColumn()
  // lessons: string;
}
