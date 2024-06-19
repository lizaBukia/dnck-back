import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicInterface } from './interfaces/music.interface';
import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  creat(@Body() createMusicDto: CreateMusicDto): MusicInterface {
    return this.musicsService.create(createMusicDto);
  }

  @Get()
  findAll(): MusicInterface[] {
    return this.musicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): MusicInterface {
    return this.musicsService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ): MusicInterface {
    return this.musicsService.update(Number(id), updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): MusicInterface[] {
    return this.musicsService.remove(Number(id));
  }
}
