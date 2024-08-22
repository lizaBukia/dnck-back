import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from 'src/data/entity/data.entity';
import { DataRepository } from 'src/data/repository/data.repository';
import { S3Service } from 'src/storage/s3.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repositories/albums.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Data])],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository, S3Service, DataRepository],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
