import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumsRepository } from 'src/albums/repositories/albums.repository';
import { ArtistsModule } from 'src/artist/artists.module';
import { ArtistsRepository } from 'src/artist/repository/artists.repository';
import { MusicsModule } from 'src/musics/musics.module';
import { MusicsRepository } from 'src/musics/repositories/musics.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [
    SearchService,
  ],
  imports: [AlbumsModule, ArtistsModule, MusicsModule],
})
export class SearchModule {}
