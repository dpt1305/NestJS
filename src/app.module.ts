import { Lesson } from './lessons/entities/lesson.entity';
import { Course } from './courses/entities/course.entity';
import { User } from './auth/entities/user.entity';
// import { TypeOrmModule } from '@nestjs/orm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-manager',
      synchronize: true,
      entities: [Task, User, Course, Lesson],
      // entities: [__dirname + '/../**/*.entity.ts'],
    }),
    CoursesModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
