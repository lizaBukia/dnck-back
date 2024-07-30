import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
    playlist.musics = this.createMusics(createPlaylistDto.musicIds);

    await this.playlistRepository.save(playlist);

    return await this.playlistRepository.findOne({
      where: { id: playlist.id },
      relations: { musics: true },
    });
  }

  private createMusics(musicIds: number[]): Music[] {
    const musics: Music[] = [];

    for (const musicId of musicIds) {
      const music: Music = new Music();
      music.id = musicId;
      musics.push(music);
    }

    return musics;
  }

  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .getMany();
  }

  async findOne(id: number): Promise<Playlist | undefined> {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .where('playlist.id= :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const { musicIds: newMusicIds, ...rest } = updatePlaylistDto;
    const playlist: Playlist = await this.playlistRepository.findOneOrFail({
      where: { id },
      relations: ['musics'],
    });

    await this.playlistRepository
      .createQueryBuilder()
      .update(Playlist)
      .set(rest as QueryDeepPartialEntity<Playlist>)
      .where('id = :id', { id })
      .execute();

    if (newMusicIds?.length) {
      await this.updatePlaylistMusics(
        id,
        newMusicIds,
        playlist.musics.map((music) => music.id),
      );
    }
    return await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.playlistRepository.softDelete(id);
  }

  async updatePlaylistMusics(
    id: number,
    newMusicIds: number[],
    oldMusicIds: number[],
  ): Promise<void> {
    await this.playlistRepository
      .createQueryBuilder()
      .relation(Playlist, 'musics')
      .of(id)
      .addAndRemove(newMusicIds, oldMusicIds);
  }
}
