import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(userDto: UserDto) {
    try {
      await this.userRepository.createUser(userDto);
      return `Successfully: create a new user.`;
    } catch (error) {
      console.log(error);
      return `Fail !`;
    }
  }
  async signIn(userDto: UserDto) {
    const { username, password } = userDto;

    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });
      // console.log(user);
      const checkPassword = await bcrypt.compare(password, user.password);
      if (user && checkPassword) {
        const payload = username;
        const access_token: string = await this.jwtService.sign({ username });
        return `jwt: ${access_token}`;
      }
      return `fail asd`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
