import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';
import { Music } from '../musics/entities/musics.entity';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { PlaylistsRepository } from './repositories/playlists.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Music]), StorageModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistsRepository],
})
export class PlaylistsModule {}
