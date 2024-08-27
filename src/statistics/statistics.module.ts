import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entity/statistic.entity';
import { StatisticsRepository } from './repositorys/statisticks.repository';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic])],
  providers: [StatisticsService, StatisticsRepository],
  controllers: [StatisticsController],
  exports: [StatisticsRepository],
})
export class StatisticsModule {}
