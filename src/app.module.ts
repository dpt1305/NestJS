import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
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
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, CloudinaryProvider],
})
export class AppModule {}
