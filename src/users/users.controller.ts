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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
      
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

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
