import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FindOneMusicInterface } from './interfaces/find-one-musics.interface';
import { MusicInterface } from './interfaces/music.interface';
import { MusicsRepository } from './repositories/musics.repository';

@Injectable()
export class MusicsService {
  constructor(private readonly musicsRepository: MusicsRepository) {}

  create(createMusicDto: CreateMusicDto): MusicInterface {
    return this.musicsRepository.create(createMusicDto);
  }

  findAll(): MusicInterface[] {
    return this.musicsRepository.findAll();
  }

  findOne(id: number): MusicInterface {
    const music: FindOneMusicInterface = this.musicsRepository.findOne(id);
    delete music.index;
    return music;
  }

  update(id: number, updateMusicDto: UpdateMusicDto): MusicInterface {
    return this.musicsRepository.update(id, updateMusicDto);
  }

  remove(id: number): MusicInterface[] {
    return this.musicsRepository.remove(id);
  }
}
