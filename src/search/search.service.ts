import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { AlbumsRepository } from 'src/albums/repositories/albums.repository';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { ArtistsRepository } from 'src/artist/repository/artists.repository';
import { Music } from 'src/musics/entities/musics.entity';
import { MusicsRepository } from 'src/musics/repositories/musics.repository';
import { SearchResponseDto } from './dto/search-result.dto';

@Injectable()
export class SearchService {
  constructor(
    private albumsRepository: AlbumsRepository,
    private artistRepository: ArtistsRepository,
    private musicRepository: MusicsRepository,
  ) {}

  async search(search: string): Promise<SearchResponseDto> {
    const albums: Album[] = await this.albumsRepository.findAll(search);
    const artists: ArtistEntity[] = await this.artistRepository.findAll(search);
    const musics: Music[] = await this.musicRepository.findAll(search);

    return {
      albums,
      artists,
      musics,
    };
  }
}
