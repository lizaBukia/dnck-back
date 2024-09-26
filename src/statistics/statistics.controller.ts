import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { CreateStatisticDto } from './dto/create-statistc.dto';
import { Statistic } from './entity/statistic.entity';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statistcsService: StatisticsService) {}

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Post()
  async addlisendMusic(
    @Body() createStatisticDto: CreateStatisticDto,
    @Req() req: { user: { id } },
  ): Promise<Statistic> {
    return await this.statistcsService.createStatistic(
      createStatisticDto,
      req.user.id,
    );
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async findAll(): Promise<Statistic[]> {
    return await this.statistcsService.findAll();
  }
}
