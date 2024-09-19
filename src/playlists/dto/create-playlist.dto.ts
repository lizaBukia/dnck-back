import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsUrl()
  imgUrl: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @IsArray()
  musicIds: number[];
}
