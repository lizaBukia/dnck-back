import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/history/entity/history.entity';
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

  async create(createMusicDto: CreateMusicDto, data: History): Promise<Music> {
    const newMusic: Music = new Music();

    newMusic.albumId = createMusicDto.albumId;
    newMusic.history = data;
    newMusic.name = createMusicDto.name;

    return await this.musicsRepository.save(newMusic);
  }

  async findAll(search?: string): Promise<Music[]> {
    const query: SelectQueryBuilder<Music> = this.musicsRepository
      .createQueryBuilder('musics')
      .leftJoinAndSelect('musics.album', 'album')
      .leftJoinAndSelect('album.artists', 'artist')
      .leftJoinAndSelect('musics.history', 'history');
    if (search) {
      query.where('musics.name LIKE :search', { search: `%${search}%` });
    }
    return await query.getMany();
  }

  async findOne(id: number): Promise<Music> {
    return await this.musicsRepository.findOne({
      where: { id },
      relations: {
        statistics: true,
        album: {
          artists: true,
        },
      },
    });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    await this.musicsRepository.update(id, updateMusicDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.musicsRepository.delete(id);
  }
}
