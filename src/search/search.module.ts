import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artist/artists.module';
import { MusicsModule } from 'src/musics/musics.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [AlbumsModule, ArtistsModule, MusicsModule],
})
export class SearchModule {}
