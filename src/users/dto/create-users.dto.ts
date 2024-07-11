import { IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
