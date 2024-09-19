import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { History } from 'src/history/entity/history.entity';
import { S3Service } from 'src/storage/s3.service';
import { DeleteResult } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { SearchPLaylistQueryDto } from './dto/search-playlist-query.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsRepository } from './repositories/playlists.repository';
@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playlistsRepository: PlaylistsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createPlaylistDto: CreatePlaylistDto,
    file: Express.Multer.File,
    token: string,
  ): Promise<Playlist> {
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).userId;

    const data: History = await this.s3Service.uploadFile(file, userId);

    return await this.playlistsRepository.create(createPlaylistDto, data);
  }

  async findAll(
    searchPLaylistQueryDto: SearchPLaylistQueryDto,
  ): Promise<Playlist[]> {
    return await this.playlistsRepository.findAll(
      searchPLaylistQueryDto.search,
    );
  }

  async findOne(id: number): Promise<Playlist> {
    return await this.playlistsRepository.findOne(id);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistsRepository.update(id, updatePlaylistDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.playlistsRepository.remove(id);
  }
}
