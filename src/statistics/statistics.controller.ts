import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/guard/publick.key';
import { MusicId } from './dto/musickId.dto';
import { Statistic } from './entity/statistic.entity';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statistcsService: StatisticsService) {}
  @Public()
  @Post()
  addlisendMusic(@Body() musicId: MusicId): Promise<Statistic> {
    return this.statistcsService.addLisendMusic(musicId);
  }
}
