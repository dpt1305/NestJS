import { Role } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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
      });
      await this.usersRepository.save(user);
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
}
