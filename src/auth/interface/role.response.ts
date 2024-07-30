import { RoleEnum } from '../enum/user.role';

export interface RoleMetadata {
  length: number;
  roles: RoleEnum[];
  some:CallableFunction
}
