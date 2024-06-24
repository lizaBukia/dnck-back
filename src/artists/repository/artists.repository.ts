import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistInterface } from '../interfaces/artist.interface';
import { FindOneArtistInterface } from '../interfaces/find-one-artist.interface';

@Injectable()
export class ArtistsRepository {
  private artists: ArtistInterface[] = [];

  create(createArtistDto: CreateArtistDto): ArtistInterface {
    const newArtist: ArtistInterface = {
      id: this.artists.length + 1,
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): ArtistInterface[] {
    return this.artists;
  }

  findOne(id: number): FindOneArtistInterface {
    for (let i: number = 0; i < this.artists.length; i++) {
      if (this.artists[i].id === id) {
        return { index: i, ...this.artists[i] };
      }
    }
    return null;
  }

  update(id: number, updateArtistDto: UpdateArtistDto): ArtistInterface {
    const artist: FindOneArtistInterface = this.findOne(id);
    const { firstName, lastName, biography } = updateArtistDto;
    const updatedArtists: ArtistInterface = {
      firstName: firstName || artist.firstName,
      lastName: lastName || artist.lastName,
      biography: biography || artist.biography,
      id: artist.id,
    };
    this.artists[artist.index] = updatedArtists;
    return updatedArtists;
  }

  remove(id: number): ArtistInterface[] {
    const artist: FindOneArtistInterface = this.findOne(id);
    return this.artists.splice(artist.index, 1);
  }
}
