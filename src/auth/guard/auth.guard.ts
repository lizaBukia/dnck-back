import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { IS_PUBLIC_KEY } from './publick.key';
import { ROLES_KEY } from './roles.key';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('shemodis');

    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    const roles: string[] = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const isRouteGuardedWithRoles: boolean = !!roles?.length;

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);
    try {
      const payload: JwtPayloadInterface =
        await this.jwtService.verifyAsync<JwtPayloadInterface>(token, {
          secret: process.env.JWT_SECRET,
        });

      if (isRouteGuardedWithRoles) {
        this.validateRoles(roles, payload.role);
      }
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private validateRoles(routeRoles: string[], userRole: string): void {
    const doesUserHasRequiredRoles: boolean = routeRoles.some((role: string) =>
      role.includes(userRole),
    );
    if (!doesUserHasRequiredRoles) {
      throw new UnauthorizedException();
    }
  }
}
