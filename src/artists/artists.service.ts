import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistInterface } from './interfaces/artist.interface';
import { FindOneArtistInterface } from './interfaces/find-one-artist.interface';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistssService {
  constructor(private artistsRepository: ArtistsRepository) {}

  create(createArtistDto: CreateArtistDto): ArtistInterface {
    return this.artistsRepository.create(createArtistDto);
  }

  findAll(): ArtistInterface[] {
    return this.artistsRepository.findAll();
  }

  findOne(id: number): ArtistInterface {
    const artist: FindOneArtistInterface = this.artistsRepository.findOne(id);
    delete artist.index;
    return artist;
  }

  update(id: number, updateArtistDto: UpdateArtistDto): ArtistInterface {
    return this.artistsRepository.update(id, updateArtistDto);
  }

  remove(id: number): ArtistInterface[] {
    return this.artistsRepository.remove(id);
  }
}
