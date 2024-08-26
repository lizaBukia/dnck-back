import { Module } from '@nestjs/common';
import { HistoryModule } from 'src/history/history.module';
import { S3Service } from './s3.service';
import { StorageController } from './storage.controller';

@Module({
  imports: [HistoryModule],
  controllers: [StorageController],
  providers: [S3Service],
  exports: [S3Service],
})
export class StorageModule {}
