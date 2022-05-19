import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Author } from 'src/authorization/author.decorator';
import { Role } from 'src/users/entities/user.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
@ApiTags('Course')
// @ApiBearerAuth()
@Author(Role.User)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req) {
    return this.coursesService.create(createCourseDto, req.user);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // @Get(':id')
  // findLessonsByCourse(@Param('id') idCourse: string) {
  //   return this.coursesService.findLessonsByCourse(idCourse);
  // }
  @Post(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
