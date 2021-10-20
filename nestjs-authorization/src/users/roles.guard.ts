import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // User would be retrieved from the jwt token
    // const { user } = context.switchToHttp().getRequest();
    const user = {
      name: 'Benny',
      roles: [Role.ADMIN],
    };

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
