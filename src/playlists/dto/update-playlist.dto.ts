import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePlaylistDto } from './create-playlist.dto';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsOptional()
  musics?: CreateMusicDto[];
}
