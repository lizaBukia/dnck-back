import { role } from '../enum/user.role';

export interface JwtPayload {
  verifyAsync: boolean;
  secret: string;
  role: role;
}
