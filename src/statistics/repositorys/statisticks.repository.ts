import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatisticDto } from '../dto/create-statistc.dto';
import { Statistic } from '../entity/statistic.entity';
@Injectable()
export class StatisticsRepository {
  constructor(
    @InjectRepository(Statistic)
    private statisticRepository: Repository<Statistic>,
  ) {}

  async createStatistic(
    createStatistickDto: CreateStatisticDto,
    userId: number,
  ): Promise<Statistic> {
    const newStatistic: Statistic = new Statistic();
    newStatistic.musicId = createStatistickDto.musicId;
    newStatistic.userId = userId;
    return await this.statisticRepository.save(createStatistickDto);
  }
  async findAll(): Promise<Statistic[]> {
    const statistic: Statistic[] = await this.statisticRepository.find({
      relations: { musics: true, users: true },
    });
    return statistic;
  }
}
