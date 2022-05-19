import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'thisismysecret',
      signOptions: {
        expiresIn: '30d',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    NestjsFormDataModule,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
