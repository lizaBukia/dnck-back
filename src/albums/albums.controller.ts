import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumInterface } from './interfaces/album.interface';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumInterface {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll(): AlbumInterface[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): AlbumInterface {
    return this.albumService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumInterface {
    return this.albumService.update(Number(id), updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): AlbumInterface[] {
    return this.albumService.remove(Number(id));
  }
}
