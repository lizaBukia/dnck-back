import { RoleEnum } from '../enum/user.role';

export interface JwtPayloadInterface {
  role: RoleEnum;
  id: number;
}
