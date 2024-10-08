import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from 'src/history/history.module';
import { StorageModule } from '../storage/storage.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repositories/albums.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), StorageModule, HistoryModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
