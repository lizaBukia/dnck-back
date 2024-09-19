import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';

@Injectable()
export class ArtistssService {
  constructor(private artistsRepository: ArtistsRepository) {}

  create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return this.artistsRepository.create(createArtistDto);
  }

  findAll(searchArtistQueryDto: SearchQueryDto): Promise<ArtistEntity[]> {
    return this.artistsRepository.findAll(searchArtistQueryDto);
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
