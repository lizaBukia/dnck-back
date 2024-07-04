import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistssService } from './artists.service';
import { ArtistssRepository } from './repository/artists.repository';

@Module({
  providers: [ArtistssService, ArtistssRepository],
  controllers: [ArtistsController],
})
export class AuthorsModule {}
