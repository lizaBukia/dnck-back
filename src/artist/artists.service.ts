import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { SearchArtistQueryDto } from './dto/search-artist-query.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistssService {
  constructor(private artistsRepository: ArtistsRepository) {}

  create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return this.artistsRepository.create(createArtistDto);
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
