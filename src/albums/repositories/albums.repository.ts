import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/history/entity/history.entity';
import {
  DeepPartial,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';

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
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('musics.albumId', 'albumId')
            .addSelect('COUNT(statistics.musicId)', 'totalListenings')
            .from('music', 'musics')
            .leftJoin('musics.statistics', 'statistics')
            .groupBy('musics.albumId');
        },
        'albumListenings',
        'albumListenings.albumId = album.id'
      )
      .addSelect('COALESCE(albumListenings.totalListenings, 0)', 'totalListenings');
  
    if (searchAlbumQueryDto?.search) {
      query.where('album.name LIKE :search', { search: `%${searchAlbumQueryDto.search}%` });
    }
    
    
    query.orderBy('totalListenings', 'DESC');
  
    if (searchAlbumQueryDto?.limit) {
      query.limit(searchAlbumQueryDto.limit);
    }
    return await query.getRawMany();
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
