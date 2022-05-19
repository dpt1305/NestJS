import { Message } from './../constants/message.template';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService}
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   const check = await bcrypt.compare(pass, user.password);
  //   if (user && check) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  async signIn(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(
      createUserDto.email.toString(),
    );
    const check =  await bcrypt.compare(createUserDto.password, user.password);
    if (user && check) {
      const payload = user.email;

      const accessToken = await this.jwtService.sign({ payload });
      // console.log(accessToken);

      // return {
      //   access_token: accessToken,
      // };
      return {
        code: 200,
        message: 'Success',
        data: accessToken,
      };
    }
    return {
      code: 408,
      message: 'Unauthorized',
      data: 'Fail to log in',
    };
  }
}
