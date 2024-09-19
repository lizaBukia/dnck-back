import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsOptional()
  musics?: CreateMusicDto[];
}
