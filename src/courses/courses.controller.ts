import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  NotFoundException,
  BadRequestException,
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
@Author(Role.Admin)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      return {
        code: 200,
        message: 'Success',
        data: await this.coursesService.create(createCourseDto),
      };
    } catch (error) {
      return {
        code: 400,
        message: 'Fail to create',
        data: null,
      };
    }
  }

  @Get()
  @Author(Role.User, Role.Admin)
  async findAll() {
    try {
      return {
        code: 200,
        message: 'Success',
        data: await this.coursesService.findAll(),
      };
    } catch (error) {
      return {
        code: 400,
        message: 'Fail',
        data: null,
      };
    }
  }
  
  @Post(':id')
  async findOne(@Param('id') id: string) {
    try {
      return {
        code: 200,
        message: 'Success',
        data: await this.coursesService.findOne(id),
      };
    } catch (error) {
      throw new NotFoundException('Can not find course');
    }
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    try {
      return {
        code: 200,
        message: 'Success',
        data: await this.coursesService.update(id, updateCourseDto),
      };
    } catch (error) {
      throw new BadRequestException('Can not update course.');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
