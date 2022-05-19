import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// const options = new DocumentBuilder().addBearerAuth();
import { FormDataRequest } from 'nestjs-form-data';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  // @FormDataRequest()
  async signIn(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signIn(createUserDto);
    } catch (error) {
      // throw new RequestTimeoutException('Bad connection.');
      return {
        code: 400,
        message: 'Your email or password is incorrect.',
        data: null,
      };
    }
  }
  @Post()
  callTest() {
    return 'qwwehcsvxszxcv ';
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/test')
  test() {
    return 'Test';
  }
}
