import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from 'src/history/history.module';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { StorageModule } from 'src/storage/storage.module';
import { Music } from './entities/musics.entity';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicsRepository } from './repositories/musics.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music]),
    StatisticsModule,
    StorageModule,
    HistoryModule,
  ],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository],
  exports: [MusicsRepository],
})
export class MusicsModule {}
