import { IsNumberString } from 'class-validator';

export class CreateStatisticDto {
  @IsNumberString()
  musicId: number;
}
