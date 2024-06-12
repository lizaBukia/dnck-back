import { IsDateString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title!: string;

  @IsDateString()
  releaseDate!: string;

  @IsString()
  artistName!: string;
}
