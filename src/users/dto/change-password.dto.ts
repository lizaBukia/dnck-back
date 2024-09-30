import { IsNumberString } from 'class-validator';

export class ChangePasswordDto {
  @IsNumberString()
  password: string;
}
