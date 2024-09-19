import { IsArray, IsNumber, IsString } from 'class-validator';
export class CreateArtistDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  biography!: string;

  @IsArray()
  @IsNumber({}, { each: true })
  albumId: number[];
}
