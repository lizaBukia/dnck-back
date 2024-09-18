import { RoleEnum } from '../enum/user.role';

export interface JwtPayloadInterface {
  email: string;
  password: string;
  role: RoleEnum;
  userId: number;
}
