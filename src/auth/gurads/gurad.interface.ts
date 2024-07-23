import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { role } from '../enum/user.role';

export const ROLES_KEY: string = 'roles';

export const Roles: (...roles: role[]) => CustomDecorator<string> = (...roles: role[]) =>
    SetMetadata(ROLES_KEY, roles);
