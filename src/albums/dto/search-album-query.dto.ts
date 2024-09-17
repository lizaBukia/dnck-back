import { IsOptional, IsString } from 'class-validator';

export class SearchAlbumQueryDto {
  @IsString()
  @IsOptional()
  search?: string | undefined;
}
