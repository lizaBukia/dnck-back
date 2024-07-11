import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsRepository {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(data: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = this.albumRepository.create(data);
    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
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
