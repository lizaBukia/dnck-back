import { IsArray, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title!: string;

  @IsString()
  releaseDate!: string;

  @IsArray()
  musics!: string[];

  @IsString()
  artistName!: string;
}
