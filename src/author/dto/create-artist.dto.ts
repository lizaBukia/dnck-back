import { IsString } from 'class-validator';
export class CreateArtistDto {
  @IsString()
  firstName!: string;
  @IsString()
  lastName!: string;
  @IsString()
  biography!: string;
}
