import { IsString, Validate } from 'class-validator';

export class AuthDto {
  @IsString()
  password!: string;

  @IsString()
  email!: string;

  @IsString()
  confirmPassword!: string;
}
