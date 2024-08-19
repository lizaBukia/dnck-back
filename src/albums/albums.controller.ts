import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/guard/publick.key';
import { UpdateResult } from 'typeorm';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Post()
  @Public()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    console.log('shemodis');

    return await this.albumService.create(createAlbumDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return await this.albumService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<UpdateResult> {
    return await this.albumService.update(Number(id), updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UpdateResult> {
    return await this.albumService.remove(Number(id));
  }
}
