import { Injectable } from '@nestjs/common';
import { MusicId } from './dto/musickId.dto';
import { Statistic } from './entity/statistic.entity';
import { StatisticsRepository } from './repositorys/statisticks.repository';

@Injectable()
export class StatisticsService {
  constructor(private statisticsRepository: StatisticsRepository) {}
  async addLisendMusic(musickId: MusicId): Promise<Statistic> {
    return await this.statisticsRepository.addLisendMusic(musickId);
  }
}
