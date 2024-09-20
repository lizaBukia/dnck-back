import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @IsArray()
  musicIds: number[];
}
