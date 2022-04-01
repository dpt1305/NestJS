import { UserDto } from './dto/user.dto';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  @Post('signin')
  login(@Body() userDto: UserDto) {
    return this.authService.signIn(userDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  async test(@Req() req) {
    console.log(req);
  }
}
