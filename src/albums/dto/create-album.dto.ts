import { IsDateString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name!: string;

  @IsDateString()
  releaseDate!: string;

  @IsString()
  imgUrl!: string;
}
