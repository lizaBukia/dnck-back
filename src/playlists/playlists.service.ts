import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Music } from '../musics/entities/musics.entity';
import { SearchQueryDto } from '../search/dto/create-search.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsRepository } from './repositories/playlists.repository';

@Injectable()
export class PlaylistsService {
  constructor(private readonly playlistsRepository: PlaylistsRepository) {}

  async create(
    createPlaylistDto: CreatePlaylistDto,
    userId: number,
  ): Promise<Playlist> {
    return await this.playlistsRepository.create(createPlaylistDto, userId);
  }

  async findAll(searchPLaylistQueryDto: SearchQueryDto): Promise<Playlist[]> {
    return await this.playlistsRepository.findAll(
      searchPLaylistQueryDto.search,
    );
  }

  async findOne(id: number): Promise<Playlist> {
    return await this.playlistsRepository.findOne(id);
  }

  async getPersonal(userId: number): Promise<Playlist[]> {
    return await this.playlistsRepository.getPersonal(userId);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
    userId: number,
  ): Promise<Playlist> {
    const playlist: Playlist = await this.playlistsRepository.findOne(id);
    if (!playlist) {
      throw new BadRequestException('playlist not found');
    }

    if (playlist.userId !== userId) {
      throw new BadRequestException(
        'You have no permission to update playlist',
      );
    }

    if (updatePlaylistDto.musics && updatePlaylistDto.musics?.length) {
      const musics: Music[] = [];
      for (const music of musics) {
        const newMusic: Music = new Music();
        newMusic.id = music.id;
      }
      playlist.musics = musics;
    }

    return await this.playlistsRepository.update(id, updatePlaylistDto);
  }

  async remove(id: number, userId: number): Promise<DeleteResult> {
    const playlist: Playlist = await this.playlistsRepository.findOne(id);
    if (!playlist) {
      throw new BadRequestException();
    }
    if (playlist.userId !== userId) {
      throw new BadRequestException(
        'You have no permission to remove playlist',
      );
    }
    return await this.playlistsRepository.remove(id);
  }
}
