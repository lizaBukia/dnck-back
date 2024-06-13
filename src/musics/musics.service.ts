import { Injectable } from '@nestjs/common';
import { CreateMusicsDto } from './dto/create-musics.dto';
import { UpdateMusicsDto } from './dto/update-musics.dto';
import { FindOneMusicInterface } from './interfaces/find-one-musics.interface';
import { MusicInterface } from './interfaces/musics.interface';
import { MusicsRepository } from './repositories/musics.repository';

@Injectable()
export class MusicsService {
  constructor(private readonly musicsRepository: MusicsRepository) {}

  create(createMusicsDto: CreateMusicsDto): MusicInterface {
    return this.musicsRepository.create(createMusicsDto);
  }

  findAll(): MusicInterface[] {
    return this.musicsRepository.findAll();
  }

  findOne(id: number): MusicInterface {
    const music: FindOneMusicInterface = this.musicsRepository.findOne(id);
    delete music.index;
    return music;
  }

  update(id: number, updateMusicsDto: UpdateMusicsDto): MusicInterface {
    return this.musicsRepository.update(id, updateMusicsDto);
  }

  remove(id: number): MusicInterface[] {
    return this.musicsRepository.remove(id);
  }
}
