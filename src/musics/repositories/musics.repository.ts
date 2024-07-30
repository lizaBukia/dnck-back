import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
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

  async findAll(search?: string): Promise<Music[]> {
    if (search) {
      const query: SelectQueryBuilder<Music> = this.musicsRepository
        .createQueryBuilder('musics')
        .where('musics.name LIKE :search', { search: `%${search}%` });
      return await query.getMany();
    }
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
