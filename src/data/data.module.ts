import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { Data } from './entity/data.entity';
import { DataRepository } from './repository/data.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DataController],
  providers: [DataService, DataRepository],
})
export class DataModule {}
