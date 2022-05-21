import { Lesson } from './entities/lesson.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Author } from 'src/authorization/author.decorator';
import { Role } from 'src/users/entities/user.entity';

@Controller('lessons')
@ApiTags('Lesson')
@Author(Role.Admin)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create( createLessonDto );
  }

  @Get()
  @Author(Role.User, Role.Admin)
  findAll() {
    return this.lessonsService.findAll();
  }
  
  @Get(':id')
  @Author(Role.User, Role.Admin)
  findLessonsByCourseId(@Param('id') id: string) {
    return this.lessonsService.findLessonsByCourseId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
