import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Album } from 'src/albums/entities/album.entity';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = new ArtistEntity();
    newArtist.biography = createArtistDto.biography;
    newArtist.firstName = createArtistDto.firstName;
    newArtist.lastName = createArtistDto.lastName;

    const araayOfAlbums: Array<Album> = [];
    for (const albumId of createArtistDto.albumId) {
      const album: Album = new Album();
      album.id = albumId;
      araayOfAlbums.push(album);
    }
    newArtist.albums = araayOfAlbums;
    await this.artistsRepository.create(createArtistDto);
    await this.artistsRepository.save(newArtist);
    return newArtist;
  }

  async findAll(searchQueryDto?: SearchQueryDto): Promise<ArtistEntity[]> {
    const query: SelectQueryBuilder<ArtistEntity> = this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'album')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.artists', 'artists')
      .leftJoinAndSelect('musics.statistics', 'statistics');

    if (searchQueryDto?.search) {
      query.where(
        "CONCAT(artist.firstName, ' ', artist.lastName) LIKE :search",
        { search: `%${searchQueryDto.search}%` },
      );
    }
    if (searchQueryDto?.limit) {
      query.limit(searchQueryDto.limit);
    }

    const res: ArtistEntity[] = await query.getMany();

    if (searchQueryDto?.top) {
      for (const artist of res) {
        for (const album of artist.albums) {
          for (const music of album.musics) {
            music.statistics.filter((statistic) => {
              return (
                (dayjs(statistic.createdAt).isAfter(searchQueryDto.startDate) ||
                  dayjs(statistic.createdAt).isSame(
                    searchQueryDto.startDate,
                  )) &&
                (dayjs(statistic.createdAt).isBefore(searchQueryDto.endDate) ||
                  dayjs(statistic.createdAt).isSame(searchQueryDto.endDate))
              );
            });
          }
        }
      }

      const sortedArtists: ArtistEntity[] = res.sort((a, b) => {
        const totalStatisticsA: number = a.albums.reduce((sum, album) => {
          return (
            sum +
            album.musics.reduce(
              (musicSum, music) => musicSum + music.statistics.length,
              0,
            )
          );
        }, 0);

        const totalStatisticsB: number = b.albums.reduce((sum, album) => {
          return (
            sum +
            album.musics.reduce(
              (musicSum, music) => musicSum + music.statistics.length,
              0,
            )
          );
        }, 0);

        return totalStatisticsB - totalStatisticsA;
      });

      return sortedArtists;
    }

    return res;
  }

  findOne(id: number): Promise<ArtistEntity> {
    return this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'albums')
      .leftJoinAndSelect('albums.history', 'albumsHistory')
      .leftJoinAndSelect('albums.musics', 'musics')
      .leftJoinAndSelect('musics.history', 'musicsHistory')
      .where('artist.id = :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    await this.artistsRepository.update(id, updateArtistDto);
    return await this.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.artistsRepository.softDelete(id);
  }

  private _getTopArtists(): void {
    // .leftJoin(
    //         (subQuery) => {
    //           return subQuery
    //             .select('musics.albumId', 'albumId')
    //             .addSelect('COUNT(statistics.musicId)', 'totalListenings')
    //             .from('music', 'musics')
    //             .leftJoin('musics.statistics', 'statistics')
    //             .groupBy('musics.albumId');
    //         },
    //         'albumListenings',
    //         'albumListenings.albumId = album.id',
    //       )
    //       .addSelect(
    //         'COALESCE(albumListenings.totalListenings, 0)',
    //         'totalListenings',
    //       );
  }
}
