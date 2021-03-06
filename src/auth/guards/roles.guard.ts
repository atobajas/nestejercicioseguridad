import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); // cogemos los roles requeridos
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest(); // cogemos los datos del usuario
    // comprobamos si tiene o no el rol
    if (requiredRoles.some((role) => user.roles?.includes(role))) {
      return user;
    }
    else {
      return false;
    }
  }
}
