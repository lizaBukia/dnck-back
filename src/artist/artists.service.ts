import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { History } from 'src/history/entity/history.entity';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
import { S3Service } from 'src/storage/s3.service';
import { DeleteResult } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistssService {
  constructor(
    private artistsRepository: ArtistsRepository,
    private s3Service: S3Service,
  ) {}

  async create(
    createArtistDto: CreateArtistDto,
    file: Express.Multer.File,
    token: string,
  ): Promise<ArtistEntity> {
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).id;

    const data: History = await this.s3Service.uploadFile(file, userId);

    return await this.artistsRepository.create(createArtistDto, data);
  }

  findAll(searchArtistQueryDto: SearchQueryDto): Promise<ArtistEntity[]> {
    return this.artistsRepository.findAll(searchArtistQueryDto);
  }

  findOne(id: number): Promise<ArtistEntity> {
    return this.artistsRepository.findOne(id);
  }

  async update(
    id: number,
    updateArtistDto: UpdateArtistDto,
    file: Express.Multer.File,
    userId: number,
  ): Promise<ArtistEntity> {
    return await this.artistsRepository.update(
      id,
      updateArtistDto,
      file ? await this.s3Service.uploadFile(file, userId) : null,
    );
  }

  remove(id: number): Promise<DeleteResult> {
    return this.artistsRepository.remove(id);
  }
}
