import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/storage/s3.service';
import { History } from '../history/entity/history.entity';
import { HistoryRepository } from '../history/repository/history.repository';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repositories/albums.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Album, History])],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, S3Service, HistoryRepository],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
