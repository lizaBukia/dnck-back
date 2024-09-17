import { RoleEnum } from '../enum/user.role';

export interface JwtPayloadInterface {
  secret: string;
  role: RoleEnum;
  userId: number;
}
