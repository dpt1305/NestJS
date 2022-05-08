import { UserRole } from './entities/user.entity';
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
        role: UserRole.User,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new ConflictException();
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findByEmail(email) {
    return this.usersRepository.findOne({ email: email });
  }
}
