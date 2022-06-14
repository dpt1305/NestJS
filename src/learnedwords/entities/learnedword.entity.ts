import { Word } from './../../words/entities/word.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Learnedword extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.learnedword)
  user: User;

  @ManyToOne(() => Word, (word) => word.learnedword)
  word: Word;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ type: 'float' })
  interval: number;

  @Column({ type: 'int' })
  repetition: number;

  @Column({ type: 'float' })
  efactor: number;

  @Column({ type: 'int' })
  deck: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
