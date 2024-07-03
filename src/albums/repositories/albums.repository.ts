import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumEntity } from '../entities/album.entity';

@Injectable()
export class AlbumsRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(data: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum: AlbumEntity = this.albumRepository.create(data);
    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: number): Promise<AlbumEntity> {
    return await this.albumRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    data: DeepPartial<AlbumEntity>,
  ): Promise<UpdateResult> {
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
