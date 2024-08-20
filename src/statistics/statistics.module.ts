import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/musics/entities/musics.entity';
import { MusicsRepository } from 'src/musics/repositories/musics.repository';
import { Statistic } from './entity/statistic.entity';
import { StatisticsRepository } from './repositorys/statisticks.repository';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, Music])],
  providers: [StatisticsService, MusicsRepository, StatisticsRepository],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
