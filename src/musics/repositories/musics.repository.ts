import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { FindOneMusicInterface } from '../interfaces/find-one-music.interface';
import { MusicInterface } from '../interfaces/music.interface';

@Injectable()
export class MusicsRepository {
  private musics: MusicInterface[] = [];

  create(data: CreateMusicDto): MusicInterface {
    const newMusic: MusicInterface = {
      id: (this.musics[this.musics.length - 1]?.id || 0) + 1,
      name: data.name,
      url: data.url,
    };
    this.musics.push(newMusic);
    return newMusic;
  }

  findAll(): MusicInterface[] {
    return this.musics;
  }

  findOne(id: number): FindOneMusicInterface {
    for (let i: number = 0; i < this.musics.length; i++) {
      if (id === this.musics[i].id)
        return {
          ...this.musics[i],
          index: i,
        };
    }
  }

  update(id: number, data: UpdateMusicDto): MusicInterface {
    const music: FindOneMusicInterface = this.findOne(id);
    const updatedMusic: MusicInterface = {
      id: music.id,
      name: data.name || music.name,
      url: data.url || music.url,
    };
    this.musics[music.index] = updatedMusic;
    return updatedMusic;
  }

  remove(id: number): MusicInterface[] {
    const music: FindOneMusicInterface = this.findOne(id);
    return this.musics.splice(music.index, 1);
  }
}
