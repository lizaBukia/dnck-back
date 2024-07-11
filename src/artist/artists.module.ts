import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistssService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistssService, ArtistsRepository],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
