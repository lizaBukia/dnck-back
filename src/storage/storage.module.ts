import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../history/entity/history.entity';
import { HistoryRepository } from '../history/repository/history.repository';
import { S3Service } from './s3.service';
import { StorageController } from './storage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [StorageController],
  providers: [S3Service, HistoryRepository],
  exports: [S3Service],
})
export class StorageModule {}
