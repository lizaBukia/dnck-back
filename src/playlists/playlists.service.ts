import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsRepository } from './repositories/playlists.repository';

@Injectable()
export class PlaylistsService {
  constructor(private readonly playlistsRepository: PlaylistsRepository) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return await this.playlistsRepository.create(createPlaylistDto);
  }

  async findAll(): Promise<Playlist[]> {
    return await this.playlistsRepository.findAll();
  }

  async findOne(id: number): Promise<Playlist> {
    return await this.playlistsRepository.findOne(id);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistsRepository.update(id, updatePlaylistDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.playlistsRepository.remove(id);
  }
}
