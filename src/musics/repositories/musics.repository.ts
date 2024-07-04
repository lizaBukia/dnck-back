import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { Music } from '../entities/musics.entity';

@Injectable()
export class MusicsRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>,
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const newMusic: Music = this.musicsRepository.create(createMusicDto);
    return await this.musicsRepository.save(newMusic);
  }

  async findAll(): Promise<Music[]> {
    return await this.musicsRepository.find();
  }

  async findOne(id: number): Promise<Music> {
    return await this.musicsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    await this.musicsRepository.update(id, updateMusicDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.musicsRepository.delete(id);
  }
}
