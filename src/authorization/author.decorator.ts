import { Role } from './../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, applyDecorators, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './../authorization/role.guard';

export function Author(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
