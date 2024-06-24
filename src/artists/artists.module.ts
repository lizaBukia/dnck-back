import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistssService } from './artists.service';
import { ArtistsRepository } from './repository/artists.repository';

@Module({
  providers: [ArtistssService, ArtistsRepository],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
