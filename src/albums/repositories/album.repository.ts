import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import {
  AlbumInterface,
  FindOneAlbumInterface,
} from '../interfaces/album.interface';

@Injectable()
export class AlbumsRepository {
  private albums: AlbumInterface[] = [];

  create(data: CreateAlbumDto): AlbumInterface {
    const newAlbum: AlbumInterface = {
      id: (this.albums[this.albums.length - 1]?.id || 0) + 1,
      title: data.title,
      releaseDate: data.releaseDate,
      musics: data.musics,
      artistName: data.artistName,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): AlbumInterface[] {
    return this.albums;
  }

  findOne(id: number): FindOneAlbumInterface {
    for (let i: number = 0; i < this.albums.length; i++) {
      if (id == this.albums[i].id)
        return {
          ...this.albums[i],
          index: i,
        };
    }
  }

  update(id: number, data: UpdateAlbumDto): AlbumInterface {
    const albums: FindOneAlbumInterface = this.findOne(id);
    const albumsUpdate: AlbumInterface = {
      id: albums.id,
      title: data.title || albums.title,
      releaseDate: data.releaseDate || albums.releaseDate,
      musics: data.musics || albums.musics,
      artistName: data.artistName || albums.artistName,
    };
    this.albums[albums.index] = albumsUpdate;
    return albumsUpdate;
  }

  remove(id: number): AlbumInterface[] {
    const album: FindOneAlbumInterface = this.findOne(id);
    return this.albums.splice(album.index, 1);
  }
}
