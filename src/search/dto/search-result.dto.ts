import { Album } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Music } from 'src/musics/entities/musics.entity';

export class SearchResponseDto {
  musics: Music[];
  artists: ArtistEntity[];
  albums: Album[];
}
