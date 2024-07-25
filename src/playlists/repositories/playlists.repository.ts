import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Music } from '../../musics/entities/musics.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { Playlist } from '../entities/playlist.entity';

@Injectable()
export class PlaylistsRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist: Playlist =
      this.playlistRepository.create(createPlaylistDto);
    const arrayOfMusics: Music[] = [];
    for (const musicId of createPlaylistDto.musicIds) {
      const music: Music = new Music();
      music.id = musicId;
      arrayOfMusics.push(music);
    }
    playlist.music = arrayOfMusics;
    await this.playlistRepository.save(playlist);
    return await this.playlistRepository.findOne({
      where: { id: playlist.id },
      relations: { music: true },
    });
  }

  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.music', 'music')
      .getMany();
  }

  async findOne(id: number): Promise<Playlist | undefined> {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.music', 'music')
      .where('playlist.id= :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const { musicIds: _musicIds, ...rest } = updatePlaylistDto;
    console.log(id);
    const query: UpdateQueryBuilder<Playlist> = this.playlistRepository
      .createQueryBuilder()
      .update()
      .set(rest as QueryDeepPartialEntity<Playlist>)
      .where('id = :id', { id });

    await query.execute();
    return await this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.playlistRepository.softDelete(id);
  }
}
