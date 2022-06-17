import { FormOfOneWord, UpdateAfterReviewDto } from './dto/update-after-review.dto';
import { Learnedword } from './entities/learnedword.entity';
import { Author } from 'src/authorization/author.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LearnedwordsService } from './learnedwords.service';
import { CreateLearnedwordDto } from './dto/create-learnedword.dto';
import { UpdateLearnedwordDto } from './dto/update-learnedword.dto';
import { Role } from 'src/users/entities/user.entity';
import { UpdateLearnedwordAfterAnswerDto } from './dto/update-learnedword-after-answer.dto';
import { supermemo, SuperMemoGrade, SuperMemoItem } from 'supermemo';

@Controller('learnedwords')
@ApiTags('Learnedwords')
@Author(Role.Admin, Role.User)
export class LearnedwordsController {
  constructor(private readonly learnedwordsService: LearnedwordsService) {}

  @Post()
  create(@Body() createLearnedwordDto: CreateLearnedwordDto, @Req() req) {

    return this.learnedwordsService.create(createLearnedwordDto, req.user);
  }

  @Get('report')
  getReportForUser(@Req() req) {
    return this.learnedwordsService.getReportForUser(req.user);
  }
  @Get('word-for-review')
  @ApiOperation({ summary: 'Use when review words' })
  getWordForReview(@Req() req) {
    return this.learnedwordsService.getWordForReview(req.user);
  }
  @Get()
  findAll() {
    return this.learnedwordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnedwordsService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update one learnedword'})
  // update(@Param('id') id: string, @Body() updateLearnedwordDto: UpdateLearnedwordDto) {
  //   return this.learnedwordsService.update(id, updateLearnedwordDto);
  // }
  @Post('update-after-answer2')
  @ApiOperation({ summary: 'Update learnedwords after review' })
  async updateAfterAnswer2(@Body() updateAfterReviewDto: UpdateAfterReviewDto, @Req() req) {
    return this.learnedwordsService.updateAfterAnswer2(updateAfterReviewDto, req.user);
  }
  // @Patch('update-after-answer/:id')
  // async updateAfterAnswer(@Param('id') id: string, @Body() updateLearnedwordAfterAnswerDto: UpdateLearnedwordAfterAnswerDto) {
  //   return this.learnedwordsService.updateAfterAnswer( id, updateLearnedwordAfterAnswerDto );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.learnedwordsService.remove(+id);
  // }
}
