import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Reflector } from '@nestjs/core';

export const Role = Reflector.createDecorator<string>();

@Injectable()
export class RoleAcessGurd implements CanActivate {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get(Role, context.getHandler());
    const user = await this.databaseService.person.findUnique({
      where: { id: '' },
    });
    if (!user) {
      throw new ForbiddenException('user not found!');
    }
    if (!user.role.includes(role)) {
      throw new ForbiddenException('access denied!');
    }
    return true;
  }
}
