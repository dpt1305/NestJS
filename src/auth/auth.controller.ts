import { UserDto } from './dto/user.dto';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
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
}
