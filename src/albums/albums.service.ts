import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UpdateResult } from 'typeorm';
import { S3Service } from '../storage/s3.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { SearchAlbumQueryDto } from './dto/search-album-query.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repositories/albums.repository';
@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createAlbomDto: CreateAlbumDto,
    token: string,
    file: Express.Multer.File,
  ): Promise<Album> {
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).userId;

    const location: string = await this.s3Service.uploadFile(file, userId);
    if (location) {
      createAlbomDto.imgUrl = location;
    }
    return await this.albumsRepository.create(createAlbomDto);
  }

  async findAll(searchAlbumQueryDto: SearchAlbumQueryDto): Promise<Album[]> {
    return await this.albumsRepository.findAll(searchAlbumQueryDto.search);
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
