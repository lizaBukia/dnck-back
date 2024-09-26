import { IsNumber } from 'class-validator';

export class CreateStatisticDto {
  @IsNumber()
  musicId: number;
}
