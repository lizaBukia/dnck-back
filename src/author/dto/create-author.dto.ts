import { IsNumber, IsString } from 'class-validator';
export class CreateAuthhorDto {
  @IsNumber()
  id: number;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  biography: string;
}
