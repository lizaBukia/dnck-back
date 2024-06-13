import { IsString } from 'class-validator';

export class CreateMusicsDto {
  @IsString()
  name!: string;

  @IsString()
  url!: string;
}