import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/musics.entity';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicsRepository } from './repositories/musics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository],
})
export class MusicsModule {}
