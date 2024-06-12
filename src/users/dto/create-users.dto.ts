import { IsNumber, IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsNumber()
  birthYear!: number;
}
