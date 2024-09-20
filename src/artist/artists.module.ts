import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistssService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity]),StorageModule],
  providers: [ArtistssService, ArtistsRepository],
  controllers: [ArtistsController],
  exports: [ArtistsRepository],
})
export class ArtistsModule {}
