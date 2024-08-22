import { Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { Data } from './entity/data.entity';
import { DataRepository } from './repository/data.repository';

@Injectable()
export class DataService {
  constructor(private dataRepository: DataRepository) {}
  async createData(createDataDto: CreateDataDto): Promise<Data> {
    return await this.dataRepository.createData(createDataDto);
  }
}
