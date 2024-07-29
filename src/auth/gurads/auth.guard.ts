import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/auth.constants';
import { JwtPayload } from '../interface/payload.response';
import { RoleMetadata } from '../interface/role.response';
import { IS_PUBLIC_KEY } from './guard.key';
import { ROLES_KEY } from './gurad.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const roles: RoleMetadata =
        this.reflector.getAllAndOverride<RoleMetadata>(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
      const isRouteGuardedWithRoles: boolean = roles.length;
      if (roles && roles.roles && isRouteGuardedWithRoles) {
        return roles.roles.some((role) => payload.role === role);
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
