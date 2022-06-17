import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  RequestTimeoutException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Author } from 'src/authorization/author.decorator';
import { Role } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user-timeout')
  @Author(Role.User)
  getTimeout(@Req() req) {
    return this.usersService.getTimeout(req.user);
  }

  @Author(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  @Get()
  @Author(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Author(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Author(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    if (result.affected) {
      return `Delete user id: ${id} sucessfully.`;
    } else {
      throw new NotFoundException();
    }
  }
}
