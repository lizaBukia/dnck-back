import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/history/entity/history.entity';
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

  async create(
    createArtistDto: CreateArtistDto,
    data: History,
  ): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = new ArtistEntity();
    newArtist.biography = createArtistDto.biography;
    newArtist.firstName = createArtistDto.firstName;
    newArtist.lastName = createArtistDto.lastName;
    newArtist.history = data;
    await this.artistsRepository.create(createArtistDto);
    await this.artistsRepository.save(newArtist);
    return newArtist;
  }

  async findAll(searchQueryDto?: SearchQueryDto): Promise<ArtistEntity[]> {
    const query: SelectQueryBuilder<ArtistEntity> = this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'album')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.artists', 'artists');
    if (searchQueryDto?.topDate && !searchQueryDto?.search) {
      query
        .leftJoin(
          (subQuery) => {
            return subQuery
              .select('musics.albumId', 'albumId')
              .addSelect('COUNT(statistics.musicId)', 'totalListenings')
              .from('music', 'musics')
              .leftJoin('musics.statistics', 'statistics')
              .groupBy('musics.albumId')
              .where('statistics.createdAt >= :topDate', {
                topDate: searchQueryDto.topDate,
              });
          },
          'albumListenings',
          'albumListenings.albumId = album.id',
        )
        .addSelect(
          'COALESCE(albumListenings.totalListenings, 0)',
          'totalListenings',
        );
      query.orderBy('totalListenings', 'DESC');
    }
    if (searchQueryDto?.search) {
      query.where(
        "CONCAT(artist.firstName, ' ', artist.lastName) LIKE :search",
        { search: `%${searchQueryDto.search}%` },
      );
    }

    if (searchQueryDto?.limit) {
      query.limit(searchQueryDto.limit);
    }
    return await query.getMany();
  }

  findOne(id: number): Promise<ArtistEntity> {
    return this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'albums')
      .leftJoinAndSelect('albums.history', 'albumsHistory')
      .leftJoinAndSelect('albums.musics', 'musics')
      .leftJoinAndSelect('musics.history', 'musicsHistory')
      .leftJoinAndSelect('artist.history', 'history')
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
}
