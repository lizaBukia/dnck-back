import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumsRepository } from './repositories/album.repository';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsRepository],
})
export class AlbumsModule {}
