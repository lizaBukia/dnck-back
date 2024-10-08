import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    userId: number,
  ): Promise<Playlist> {
    const playlist: Playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      userId,
    });
    const { musicIds = [] } = createPlaylistDto;

    playlist.musics = this.createMusics(musicIds);

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

  async findAll(search?: string): Promise<Playlist[]> {
    const query: SelectQueryBuilder<Playlist> = this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .leftJoinAndSelect('musics.album', 'album')
      .leftJoinAndSelect('album.history', 'albumHistory')
      .leftJoinAndSelect('musics.history', 'musicHistory');

    if (search) {
      query.where('playlist.title LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Playlist | undefined> {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .leftJoinAndSelect('musics.history', 'history')
      .leftJoinAndSelect('musics.album', 'album')
      .leftJoinAndSelect('album.history', 'history2')

      .where('playlist.id= :id', { id })
      .getOne();
  }

  async getPersonal(userId: number): Promise<Playlist[]> {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .leftJoinAndSelect('musics.history', 'history')
      .leftJoinAndSelect('musics.album', 'album')
      .leftJoinAndSelect('album.history', 'history2')
      .where('playlist.userId = :userId', { userId })
      .getMany();
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const { musicIds: newMusicIds, ...rest } = updatePlaylistDto;

    await this.playlistRepository
      .createQueryBuilder()
      .update(Playlist)
      .set(rest as QueryDeepPartialEntity<Playlist>)
      .where('id = :id', { id })
      .execute();

    if (newMusicIds?.length) {
      await this.updatePlaylistMusics(id, newMusicIds);
    }
    return await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.playlistRepository.softDelete(id);
  }

  async updatePlaylistMusics(id: number, newMusicIds: number[]): Promise<void> {
    await this.playlistRepository
      .createQueryBuilder()
      .relation(Playlist, 'musics')
      .of(id)
      .add(newMusicIds);
  }
}
