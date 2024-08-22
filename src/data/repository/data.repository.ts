import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDataDto } from '../dto/create-data.dto';
import { Data } from '../entity/data.entity';
@Injectable()
export class DataRepository {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}
  async createData(createDataDto: CreateDataDto): Promise<Data> {
    const data: Data = await this.dataRepository.save(createDataDto);
    return await this.dataRepository.save(data);
  }
}
