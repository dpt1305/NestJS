import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(24)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  // @Matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$')
  password: string;
}
