import { Learnedword } from './../../learnedwords/entities/learnedword.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Role {
  'Admin' = 'Admin',
  'User' = 'User',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
  @OneToMany(()=> Learnedword, (learnedword) => learnedword.user)
  learnedword: Learnedword[];
}
