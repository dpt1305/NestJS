import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { Lesson } from './lessons/entities/lesson.entity';
import { Course } from './courses/entities/course.entity';
// import { TypeOrmModule } from '@nestjs/orm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { WordsModule } from './words/words.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-manager',
      synchronize: true,
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity.ts'],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CoursesModule,
    LessonsModule,
    WordsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
