import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { SearchArtistQueryDto } from './dto/search-artist-query.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';
import * as jwt from 'jsonwebtoken';
import { S3Service } from 'src/storage/s3.service';
import { History } from 'src/history/entity/history.entity';


@Injectable()
export class ArtistssService {
  constructor(private artistsRepository: ArtistsRepository, private s3Service:S3Service) {}

  async create(createArtistDto: CreateArtistDto,file:Express.Multer.File,token:string): Promise<ArtistEntity> {
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).id;

    const data: History = await this.s3Service.uploadFile(file, userId);

    return this.artistsRepository.create(createArtistDto,data);
  }

  findAll(searchArtistQueryDto: SearchArtistQueryDto): Promise<ArtistEntity[]> {
    return this.artistsRepository.findAll(searchArtistQueryDto.search);
  }

  findOne(id: number): Promise<ArtistEntity> {
    return this.artistsRepository.findOne(id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    return this.artistsRepository.update(id, updateArtistDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.artistsRepository.remove(id);
  }
}
