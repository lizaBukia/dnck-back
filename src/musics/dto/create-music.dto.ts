import { IsNumber, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name!: string;

  @IsNumber()
  albumId!: number;
}
