import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateAuthorDto } from './dto/update-artist.dto';
import { ArtistInterface } from './interfaces/artists.interface';
import { FindOneArtistInterface } from './interfaces/find-one-artists.interface';
import { ArtistssRepository } from './repository/artists.repository';

@Injectable()
export class ArtistssService {
  constructor(private artistssRepository: ArtistssRepository) {}

  create(createArtistDto: CreateArtistDto): ArtistInterface {
    return this.artistssRepository.create(createArtistDto);
  }

  findAll(): ArtistInterface[] {
    return this.artistssRepository.findAll();
  }

  findOne(id: number): ArtistInterface {
    const author: FindOneArtistInterface = this.artistssRepository.findOne(id);
    delete author.index;
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): ArtistInterface {
    return this.artistssRepository.update(id, updateAuthorDto);
  }

  remove(id: number): ArtistInterface[] {
    return this.artistssRepository.remove(id);
  }
}
