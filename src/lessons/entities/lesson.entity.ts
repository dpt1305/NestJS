import { Course } from './../../courses/entities/course.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';
// import { PrimaryGeneratedColumn}
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  // @Column('text')
  // id_course: string;
  @Column('text')
  // @OneToOne(() => Course, (course) => course.lessons)
  course: string;
}
