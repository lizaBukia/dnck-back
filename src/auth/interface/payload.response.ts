import { RoleEnum } from '../enum/user.role';

export interface JwtPayload {
  verifyAsync: boolean;
  secret: string;
  role: RoleEnum;
}
