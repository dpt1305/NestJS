import { WordsModule } from './../words/words.module';
import { LearnedwordsRepository } from './learnedwords.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LearnedwordsService } from './learnedwords.service';
import { LearnedwordsController } from './learnedwords.controller';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  controllers: [LearnedwordsController],
  providers: [LearnedwordsService],
  imports: [
    TypeOrmModule.forFeature([LearnedwordsRepository]),
    LessonsModule,
    WordsModule,
  ],
})
export class LearnedwordsModule {}
