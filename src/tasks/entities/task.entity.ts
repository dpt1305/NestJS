import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString } from 'class-validator';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  @Column()
  status: string;
}
