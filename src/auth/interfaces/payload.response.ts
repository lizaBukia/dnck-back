import { RoleEnum } from '../enum/user.role';

export interface JwtPayload {
  secret: string;
  role: RoleEnum;
}
