import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

export const Role = Reflector.createDecorator<string>();

@Injectable()
export class RoleAcessGurd implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get(Role, context.getHandler());

    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;

    if (user.role !== requiredRole) {
      throw new ForbiddenException('Access denied!');
    }

    return true;
  }
}
