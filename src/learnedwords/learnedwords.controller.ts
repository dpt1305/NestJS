import { Author } from 'src/authorization/author.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LearnedwordsService } from './learnedwords.service';
import { CreateLearnedwordDto } from './dto/create-learnedword.dto';
import { UpdateLearnedwordDto } from './dto/update-learnedword.dto';
import { Role } from 'src/users/entities/user.entity';

@Controller('learnedwords')
@ApiTags('Learnedwords')
@Author(Role.Admin, Role.User)
export class LearnedwordsController {
  constructor(private readonly learnedwordsService: LearnedwordsService) {}

  @Post()
  create(@Body() createLearnedwordDto: CreateLearnedwordDto, @Req() req) {

    return this.learnedwordsService.create(createLearnedwordDto, req.user);
  }

  @Get()
  findAll() {
    return this.learnedwordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnedwordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearnedwordDto: UpdateLearnedwordDto) {
    return this.learnedwordsService.update(+id, updateLearnedwordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learnedwordsService.remove(+id);
  }
}
