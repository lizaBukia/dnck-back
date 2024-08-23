import { IsNumber, IsString } from 'class-validator';

export class CreateDataDto {
  @IsString()
  location: string;

  @IsNumber()
  userId: number;
}
