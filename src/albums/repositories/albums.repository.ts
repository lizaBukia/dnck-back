import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { History } from 'src/history/entity/history.entity';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
import {
  DeepPartial,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsRepository {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(data: CreateAlbumDto, historyData: History): Promise<Album> {
    const newAlbum: Album = new Album();
    newAlbum.history = historyData;
    newAlbum.name = data.name;
    newAlbum.releaseDate = data.releaseDate;
    newAlbum.artistId = data.artistId;
    return await this.albumRepository.save(newAlbum);
  }

  async findAll(searchAlbumQueryDto?: SearchQueryDto): Promise<Album[]> {
    const query: SelectQueryBuilder<Album> = this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.artists', 'artists')
      .leftJoinAndSelect('musics.statistics', 'statistics');

    if (searchAlbumQueryDto?.search) {
      query.where('album.name LIKE :search', {
        search: `%${searchAlbumQueryDto.search}%`,
      });
    }

    if (searchAlbumQueryDto?.limit) {
      query.limit(searchAlbumQueryDto.limit);
    }

    const res: Album[] = await query.getMany();

    if (searchAlbumQueryDto?.top) {
      for (const album of res) {
        for (const music of album.musics) {
          music.statistics.filter((statistic) => {
            (dayjs(statistic.createdAt).isAfter(
              searchAlbumQueryDto.startDate,
            ) ||
              dayjs(statistic.createdAt).isSame(
                searchAlbumQueryDto.startDate,
              )) &&
              (dayjs(statistic.createdAt).isBefore(
                searchAlbumQueryDto.endDate,
              ) ||
                dayjs(statistic.createdAt).isSame(searchAlbumQueryDto.endDate));
          });
        }

        const sortedAlbums: Album[] = res.sort((a, b) => {
          const totalStatisticsA: number = a.musics.reduce(
            (sum, music) => sum + music.statistics.length,
            0,
          );
          const totalStatisticsB: number = b.musics.reduce(
            (sum, music) => sum + music.statistics.length,
            0,
          );

          return totalStatisticsB - totalStatisticsA;
        });

        return sortedAlbums;
      }
    }
    return res;
  }

  async findOne(id: number): Promise<Album> {
    return await this.albumRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, data: DeepPartial<Album>): Promise<UpdateResult> {
    return await this.albumRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.albumRepository.softDelete(id);
  }
}
