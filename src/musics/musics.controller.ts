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
import { DeleteResult } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/musics.entity';
import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  @Public()
  async create(@Body() createMusicDto: CreateMusicDto): Promise<Music> {
    return await this.musicsService.create(createMusicDto);
  }

  @Get()
  async findAll(): Promise<Music[]> {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Music> {
    return await this.musicsService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ): Promise<Music> {
    return await this.musicsService.update(Number(id), updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.musicsService.remove(Number(id));
  }
}
