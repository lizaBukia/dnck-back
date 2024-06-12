import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  AlbumInterface,
  FindOneAlbumInterface,
} from './interfaces/album.interface';
import { AlbumsRepository } from './repositories/album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  create(createAlbumDto: CreateAlbumDto): AlbumInterface {
    return this.albumsRepository.create(createAlbumDto);
  }

  findAll(): AlbumInterface[] {
    return this.albumsRepository.findAll();
  }

  findOne(id: number): AlbumInterface {
    const album: FindOneAlbumInterface = this.albumsRepository.findOne(id);
    delete album.index;
    return album;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto): AlbumInterface {
    return this.albumsRepository.update(id, updateAlbumDto);
  }

  remove(id: number): AlbumInterface[] {
    return this.albumsRepository.delete(id);
  }
}
