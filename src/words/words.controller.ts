import { Role } from './../users/entities/user.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Word } from './entities/word.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Author } from 'src/authorization/author.decorator';

@Controller('words')
@ApiTags('Words')
@Author(Role.Admin)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
      fileFilter: function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  create(
    @Body() createWordDto: CreateWordDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Word> {
    return this.wordsService.create(createWordDto, image);
  }

  @Get()
  findAll() {
    return this.wordsService.findAll();
  }

  @Author(Role.Admin, Role.User)
  @Get(':id')
  findWordsByLesson(@Param('id') lessonId: string) {
    return this.wordsService.findWordsByLesson(lessonId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
      fileFilter: function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto, @UploadedFile() image: Express.Multer.File,) {
    console.log('controller', updateWordDto, image);
    return this.wordsService.update(id, updateWordDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsService.remove(id);
  }
}
