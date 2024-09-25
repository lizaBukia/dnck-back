import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from 'src/history/history.module';
import { StorageModule } from 'src/storage/storage.module';
import { ArtistsController } from './artists.controller';
import { ArtistssService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    StorageModule,
    HistoryModule,
  ],
  providers: [ArtistssService, ArtistsRepository],
  controllers: [ArtistsController],
  exports: [ArtistsRepository],
})
export class ArtistsModule {}
