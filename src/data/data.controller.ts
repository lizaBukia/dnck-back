import { Controller } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { Data } from './entity/data.entity';

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}
  async createData(createDataDto: CreateDataDto): Promise<Data> {
    return await this.dataService.createData(createDataDto);
  }
}
