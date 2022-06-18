import { Role, User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { userInfo } from 'os';

// import { UserRole}
@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;

      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);

      const user = await this.usersRepository.create({
        ...createUserDto,
        password: hash,
        role: Role.User,
        learnedLesson: [],
      });
      await user.save();
      return user;
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ id });
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string) {
    return await this.usersRepository.delete({ id });
  }
  findByEmail(email) {
    return this.usersRepository.findOne({ email: email });
  }
  async updateTimeout(user: User, date: Date) {
    user.timeout = date;
    await user.save();
  }
  async getTimeout(user: User) {
    return {
      code: 200,
      message: 'Success',
      data: user.timeout,
    };
  }
  async addLearnedLesson(user: User, lessonId: string) {
    const arrayOfLearnedLesson = user.learnedLesson;
    if (arrayOfLearnedLesson.indexOf(lessonId) != -1) {
      return false;
    }
    user.learnedLesson.push(lessonId);
    user.save();
    return true;
  }
  async getLearnedLesson(user: User) {
    return {
      code: 200,
      message: 'Success',
      data: user.learnedLesson,
    };
  }
}
