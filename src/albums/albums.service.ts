import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repositories/albums.repository';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  async create(createAlbomDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsRepository.create(createAlbomDto);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumsRepository.findAll();
  }

  async findOne(id: number): Promise<Album> {
    return await this.albumsRepository.findOne(id);
  }

  async update(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<UpdateResult> {
    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.albumsRepository.remove(id);
  }
}
