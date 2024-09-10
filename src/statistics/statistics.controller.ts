import { Body, Controller, Get } from '@nestjs/common';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { CreateStatisticDto } from './dto/create-statistc.dto';
import { Statistic } from './entity/statistic.entity';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statistcsService: StatisticsService) {}
  addlisendMusic(
    @Body() createStatisticDto: CreateStatisticDto,
  ): Promise<Statistic> {
    return this.statistcsService.createStatistic(createStatisticDto);
  }
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async findAll(): Promise<Statistic[]> {
    return await this.statistcsService.findAll();
  }
}
