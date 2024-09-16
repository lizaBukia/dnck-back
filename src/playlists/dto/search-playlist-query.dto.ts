import { IsOptional, IsString } from 'class-validator';

export class SearchPLaylistQueryDto {
  @IsString()
  @IsOptional()
  search?: string | undefined;
}
