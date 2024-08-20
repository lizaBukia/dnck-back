import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistc.dto';
import { Statistic } from './entity/statistic.entity';
import { StatisticsRepository } from './repositorys/statisticks.repository';

@Injectable()
export class StatisticsService {
  constructor(private statisticsRepository: StatisticsRepository) {}
  async createStatistic(
    createStatisticDto: CreateStatisticDto,
  ): Promise<Statistic> {
    return await this.statisticsRepository.createStatistic(createStatisticDto);
  }
  async findAll(): Promise<Statistic[]> {
    return await this.statisticsRepository.findAll();
  }
}
