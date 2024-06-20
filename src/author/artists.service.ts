import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateAuthorDto } from './dto/update-artist.dto';
import { AuthorInterface } from './interfaces/artists.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-artists.interface';
import { ArtistssRepository } from './repository/artists.repository';

@Injectable()
export class ArtistssService {
  constructor(private artistssRepository: ArtistssRepository) {}

  create(createArtistDto: CreateArtistDto): AuthorInterface {
    return this.artistssRepository.create(createArtistDto);
  }

  findAll(): AuthorInterface[] {
    return this.artistssRepository.findAll();
  }

  findOne(id: number): AuthorInterface {
    const author: FindOneAuthorInterface = this.artistssRepository.findOne(id);
    delete author.index;
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): AuthorInterface {
    return this.artistssRepository.update(id, updateAuthorDto);
  }

  remove(id: number): AuthorInterface[] {
    return this.artistssRepository.remove(id);
  }
}
