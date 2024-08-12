import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/musics/entities/musics.entity';
import { MusicsRepository } from 'src/musics/repositories/musics.repository';
import { Repository } from 'typeorm';
import { MusicId } from '../dto/musickId.dto';
import { Statistic } from '../entity/statistic.entity';
@Injectable()
export class StatisticsRepository {
  constructor(
    @InjectRepository(Statistic)
    private statisticRepository: Repository<Statistic>,
    private musicsRepository: MusicsRepository,
  ) {}

  async addLisendMusic(musickId: MusicId): Promise<Statistic> {
    const { id }: MusicId = musickId;
    const musics: Music = await this.musicsRepository.findOne(id);
    const newMusic: Statistic = new Statistic();
    newMusic.name = musics.name;
    newMusic.imgUrl = musics.imgUrl;
    return await this.statisticRepository.save(newMusic);
  }
}
