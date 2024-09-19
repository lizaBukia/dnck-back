import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumberString()
  @IsOptional()
  limit?: number;
}
