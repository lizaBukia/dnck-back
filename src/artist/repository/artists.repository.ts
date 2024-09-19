import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = new ArtistEntity();
    newArtist.biography = createArtistDto.biography;
    newArtist.firstName = createArtistDto.firstName;
    newArtist.lastName = createArtistDto.lastName;

    const araayOfAlbums: Array<Album> = [];
    for (const albumId of createArtistDto.albumId) {
      const album: Album = new Album();
      album.id = albumId;
      araayOfAlbums.push(album);
    }
    newArtist.albums = araayOfAlbums;
    await this.artistsRepository.create(createArtistDto);
    await this.artistsRepository.save(newArtist);
    return newArtist;
  }

  async findAll(search?: string): Promise<ArtistEntity[]> {
    const query: SelectQueryBuilder<ArtistEntity> = this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'album')
      .leftJoinAndSelect('album.musics', 'musics');
    if (search) {
      query.where(
        "CONCAT(artist.firstName, ' ', artist.lastName) LIKE :search",
        {
          search: `%${search}%`,
        },
      );
    }

    return await query.getMany();
  }

  findOne(id: number): Promise<ArtistEntity> {
    return this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'albums')
      .leftJoinAndSelect('albums.history', 'albumsHistory')
      .leftJoinAndSelect('albums.musics', 'musics')
      .leftJoinAndSelect('musics.history', 'musicsHistory')
      .where('artist.id = :id', { id })
      .getOne();
  }

  async update(
    id: number,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    await this.artistsRepository.update(id, updateArtistDto);
    return await this.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.artistsRepository.softDelete(id);
  }
}
