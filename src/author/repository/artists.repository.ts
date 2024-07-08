import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateAuthorDto } from '../dto/update-artist.dto';
import { ArtistInterface } from '../interfaces/artists.interface';
import { FindOneArtistInterface } from '../interfaces/find-one-artists.interface';

@Injectable()
export class ArtistssRepository {
  private authors: ArtistInterface[] = [];

  create(createArtistDto: CreateArtistDto): ArtistInterface {
    const newAuthor: ArtistInterface = {
      id: this.authors.length + 1,
      ...createArtistDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findAll(): ArtistInterface[] {
    return this.authors;
  }

  findOne(id: number): FindOneArtistInterface {
    for (let i: number = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === id) {
        return { index: i, ...this.authors[i] };
      }
    }
    return null;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): ArtistInterface {
    const author: FindOneArtistInterface = this.findOne(id);
    const { firstName, lastName, biography } = updateAuthorDto;
    const updatedAuthor: ArtistInterface = {
      firstName: firstName || author.firstName,
      lastName: lastName || author.lastName,
      biography: biography || author.biography,
      id: author.id,
    };
    this.authors[author.index] = updatedAuthor;
    return updatedAuthor;
  }

  remove(id: number): ArtistInterface[] {
    const author: FindOneArtistInterface = this.findOne(id);
    return this.authors.splice(author.index, 1);
  }
}
