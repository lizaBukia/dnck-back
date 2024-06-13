import { Module } from '@nestjs/common';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicsRepository } from './repositories/musics.repository';

@Module({
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository],
})
export class MusicsModule {}
