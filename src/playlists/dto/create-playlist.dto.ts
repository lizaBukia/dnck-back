import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  title: string;

  @IsUrl()
  imgUrl: string;

  @IsNumber({}, { each: true })
  @IsArray()
  musicIds: number[];
}
