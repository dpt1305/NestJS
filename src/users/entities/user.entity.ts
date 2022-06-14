import { Learnedword } from './../../learnedwords/entities/learnedword.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';

export enum Role {
  'Admin' = 'Admin',
  'User' = 'User',
}
@Entity()
export class User extends BaseEntity {
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

  @Column({ type: 'timestamp', nullable: true })
  timeout: Date;

  @OneToMany(() => Learnedword, (learnedword) => learnedword.user)
  learnedword: Learnedword[];
}
