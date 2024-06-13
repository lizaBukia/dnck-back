import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicsDto } from './dto/create-musics.dto';
import { MusicInterface } from './interfaces/musics.interface';
import { UpdateMusicsDto } from './dto/update-musics.dto';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {
  }

  @Post()
  creat(@Body() createMusicsDto: CreateMusicsDto): MusicInterface {
    return this.musicsService.create(createMusicsDto);
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
    @Body() updateMusicsDto: UpdateMusicsDto,
  ): MusicInterface {
    return this.musicsService.update(Number(id), updateMusicsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): MusicInterface[] {
    return this.musicsService.remove(Number(id));
  }
}