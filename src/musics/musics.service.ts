import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { History } from 'src/history/entity/history.entity';
import { S3Service } from 'src/storage/s3.service';
import { DeleteResult } from 'typeorm';
import { StatisticsRepository } from '../statistics/repositorys/statisticks.repository';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/musics.entity';
import { MusicsRepository } from './repositories/musics.repository';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';

@Injectable()
export class MusicsService {
  constructor(
    private readonly statisticsRepository: StatisticsRepository,
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createMusicDto: CreateMusicDto,
    file: Express.Multer.File,
    token: string,
  ): Promise<Music> {
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).userId;

    const data: History = await this.s3Service.uploadFile(file, userId);

    return await this.musicsRepository.create(createMusicDto, data);
  }

  async findAll(query: SearchQueryDto): Promise<Music[]> {
    return await this.musicsRepository.findAll(query);
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
