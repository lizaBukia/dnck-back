import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/history/entity/history.entity';
import { HistoryRepository } from 'src/history/repository/history.repository';
import { S3Service } from 'src/storage/s3.service';
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
    private readonly historyRepository: HistoryRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(data: CreateAlbumDto, historyData: History): Promise<Album> {
    const newAlbum: Album = new Album();
    newAlbum.history = historyData;
    newAlbum.name = data.name;
    newAlbum.releaseDate = data.releaseDate;

    return await this.albumRepository.save(newAlbum);
  }

  async findAll(search?: string): Promise<Album[]> {
    const query: SelectQueryBuilder<Album> = this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.artists', 'artists')
      .leftJoinAndSelect('album.history', 'history');

    if (search) {
      query.where('album.name like :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Album> {
    return await this.albumRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    data: DeepPartial<Album>,
    _file: Express.Multer.File,
  ): Promise<UpdateResult> {
    if (_file) {
      const file: History = await this.historyRepository.findOne(id);
      const newLocation: string = await this.s3Service.uploadMusic(_file);
      file.location = newLocation;
      await this.historyRepository.save(file);
    }
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
