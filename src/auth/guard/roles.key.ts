import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enum/user.role';

export const ROLES_KEY: string = 'roles';

export const Roles: (...roles: RoleEnum[]) => CustomDecorator<string> = (
  ...roles: RoleEnum[]
) => SetMetadata(ROLES_KEY, roles);
