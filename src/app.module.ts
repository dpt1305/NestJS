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
import { LearnedwordsModule } from './learnedwords/learnedwords.module';
import { SupermemoModule } from './supermemo/supermemo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tungjj',
      password: 'password',
      database: 'mydb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CoursesModule,
    LessonsModule,
    WordsModule,
    UsersModule,
    AuthModule,
    CloudinaryModule,
    LearnedwordsModule,
    SupermemoModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, CloudinaryProvider],
})
export class AppModule {}
