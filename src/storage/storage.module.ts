import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from 'src/data/entity/data.entity';
import { DataRepository } from 'src/data/repository/data.repository';
import { S3Service } from './s3.service';
import { StorageController } from './storage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [StorageController],
  providers: [S3Service, DataRepository],
  exports: [S3Service],
})
export class StorageModule {}
