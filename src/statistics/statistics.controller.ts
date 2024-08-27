import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/guard/publick.key';
import { CreateStatisticDto } from './dto/create-statistc.dto';
import { Statistic } from './entity/statistic.entity';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statistcsService: StatisticsService) {}
  @Public()
  @Post()
  addlisendMusic(
    @Body() createStatisticDto: CreateStatisticDto,
  ): Promise<Statistic> {
    return this.statistcsService.createStatistic(createStatisticDto);
  }
  @Public()
  @Get()
  async findAll(): Promise<Statistic[]> {
    return await this.statistcsService.findAll();
  }
}
