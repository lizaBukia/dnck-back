import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { StatisticsRepository } from '../statistics/repositorys/statisticks.repository';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/musics.entity';
import { MusicsRepository } from './repositories/musics.repository';

@Injectable()
export class MusicsService {
  constructor(
    private readonly statisticsRepository: StatisticsRepository,
    private readonly musicsRepository: MusicsRepository,
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    return await this.musicsRepository.create(createMusicDto);
  }

  async findAll(): Promise<Music[]> {
    return await this.musicsRepository.findAll();
  }

  async findOne(id: number, userId: number): Promise<Music> {
    await this.statisticsRepository.createStatistic({ musicId: id, userId });

    const musics: Music = await this.musicsRepository.findOne(id);

    return musics;
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    return await this.musicsRepository.update(id, updateMusicDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.musicsRepository.remove(id);
  }
}
