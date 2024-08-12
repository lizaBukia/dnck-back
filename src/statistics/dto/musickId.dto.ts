import { IsNumber } from 'class-validator';

export class MusicId {
  @IsNumber()
  id: number;
}
