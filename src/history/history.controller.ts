import { Controller } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { History } from './entity/history.entity';
import { HistoryService } from './history.service';

@Controller('data')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  async createData(createDataDto: CreateDataDto): Promise<History> {
    return await this.historyService.createData(createDataDto);
  }
}
