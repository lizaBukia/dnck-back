import { Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { History } from './entity/history.entity';
import { HistoryRepository } from './repository/history.repository';

@Injectable()
export class HistoryService {
  constructor(private historyRepository: HistoryRepository) {}
  async createData(createDataDto: CreateDataDto): Promise<History> {
    return await this.historyRepository.createData(createDataDto);
  }
}
