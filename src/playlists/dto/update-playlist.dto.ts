import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsOptional()
  musics?: number[];
}
