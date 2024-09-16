import { IsOptional, IsString } from 'class-validator';

export class SearchArtistQueryDto {
  @IsString()
  @IsOptional()
  search?: string | undefined;
}
