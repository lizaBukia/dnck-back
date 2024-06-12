import { Module } from '@nestjs/common';
import { AlbumController } from './albums.controller';
import { AlbumService } from './albums.service';
import { AlbumsRepository } from './repositories/albums.repository';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsRepository],
})
export class AlbumsModule {}
