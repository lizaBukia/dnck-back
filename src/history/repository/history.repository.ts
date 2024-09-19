import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDataDto } from '../dto/create-data.dto';
import { History } from '../entity/history.entity';
@Injectable()
export class HistoryRepository {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}
  async createData(createDataDto: CreateDataDto): Promise<History> {
    const history: History = await this.historyRepository.create(createDataDto);
    return await this.historyRepository.save(history);
  }
}
