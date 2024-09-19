import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/history/entity/history.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
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

  async create(
    createPlaylistDto: CreatePlaylistDto,
    data: History,
  ): Promise<Playlist> {
    const playlist: Playlist =
      this.playlistRepository.create(createPlaylistDto);

    const { musicIds = [] } = createPlaylistDto;

    playlist.musics = this.createMusics(musicIds);

    playlist.history = data;

    await this.playlistRepository.save(playlist);

    return await this.playlistRepository.findOne({
      where: { id: playlist.id },
      relations: { musics: true, history: true },
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

  async findAll(search?: string): Promise<Playlist[]> {
    const query: SelectQueryBuilder<Playlist> = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .leftJoinAndSelect('playlist.history', 'history');

    if (search) {
      query.where('playlist.title LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
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
