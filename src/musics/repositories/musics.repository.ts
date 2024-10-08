import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/history/entity/history.entity';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { Music } from '../entities/musics.entity';

@Injectable()
export class MusicsRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>,
  ) {}

  async create(createMusicDto: CreateMusicDto, data: History): Promise<Music> {
    const newMusic: Music = new Music();

    newMusic.albumId = createMusicDto.albumId;
    newMusic.history = data;
    newMusic.name = createMusicDto.name;

    return await this.musicsRepository.save(newMusic);
  }

  async findAll(search?: SearchQueryDto): Promise<Music[]> {
    if (search.topDate && !search.search) {
      const query: SelectQueryBuilder<Music> = this.musicsRepository
        .createQueryBuilder('musics')
        .leftJoinAndSelect('musics.album', 'album')
        .leftJoinAndSelect('album.artists', 'artist')
        .leftJoinAndSelect('musics.history', 'history')
        .leftJoinAndSelect('album.history', 'albumHistory')
        .leftJoin(
          'musics.statistics',
          'statistics',
          'statistics.createdAt >= :topDate',
          { topDate: search.topDate },
        );

      query
        .groupBy('musics.id, album.id, artist.id, history.id')
        .orderBy('COUNT(statistics.musicId)', 'DESC');

      if (search.limit) {
        query.limit(search.limit);
      }
      return await query.getMany();
    }
    const query: SelectQueryBuilder<Music> = this.musicsRepository
      .createQueryBuilder('musics')
      .leftJoinAndSelect('musics.album', 'album')
      .leftJoinAndSelect('album.artists', 'artist')
      .leftJoinAndSelect('musics.history', 'history')
      .leftJoinAndSelect('album.history', 'albumHistory');
    if (search.search) {
      query.where(
        '(musics.name LIKE :search OR album.name LIKE :search OR CONCAT(artist.firstName, " ", artist.lastName) LIKE :search)',
        { search: `%${search.search}%` },
      );
    }
    return await query.getMany();
  }

  async findOne(id: number): Promise<Music> {
    return await this.musicsRepository.findOne({
      where: { id },
      relations: {
        statistics: true,
        album: {
          artists: true,
        },
      },
    });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    await this.musicsRepository.update(id, updateMusicDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.musicsRepository.softDelete(id);
  }
}
