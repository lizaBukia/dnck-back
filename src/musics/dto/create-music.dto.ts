import { IsNumberString, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name!: string;

  @IsNumberString()
  albumId!: number;

  @IsString()
  description:string
}
