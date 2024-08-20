import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from 'src/statistics/entity/statistic.entity';
import { StatisticsRepository } from 'src/statistics/repositorys/statisticks.repository';
import { Music } from './entities/musics.entity';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicsRepository } from './repositories/musics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Statistic])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository, StatisticsRepository],
  exports: [MusicsRepository],
})
export class MusicsModule {}
