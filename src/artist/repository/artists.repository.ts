import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  async create(createArtistDto: CreateArtistDto): Promise<CreateArtistDto> {
    const { firstName, lastName, biography } = createArtistDto;
    const newArtist: CreateArtistDto = await this.artistsRepository.create({
      firstName,
      lastName,
      biography,
    });
    await this.artistsRepository.save(newArtist);
    return newArtist;
  }
  async findAll(search?: string): Promise<ArtistEntity[]> {
    if (search) {
      const query: SelectQueryBuilder<ArtistEntity> = this.artistsRepository
        .createQueryBuilder('artist')
        .where("CONCAT(artist.firstName, ' ', artist.lastName) LIKE :search", {
          search: `%${search}%`,
        });
      return await query.getMany();
    }
    return await this.artistsRepository.find();
  }

  findOne(id: number): Promise<ArtistEntity> {
    return this.artistsRepository.findOne({ where: { id: id } });
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
