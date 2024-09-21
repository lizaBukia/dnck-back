import { IsNumberString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name!: string;

  @IsString()
  releaseDate!: string;

  @IsNumberString()
  artistId: number;
}
