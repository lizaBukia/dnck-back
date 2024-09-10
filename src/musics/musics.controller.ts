import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Public } from '../auth/guard/publick.key';
import { Roles } from '../auth/guard/roles.key';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/musics.entity';
import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Roles(RoleEnum.Admin)
  @Post()
  async create(@Body() createMusicDto: CreateMusicDto): Promise<Music> {
    return await this.musicsService.create(createMusicDto);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async findAll(): Promise<Music[]> {
    return await this.musicsService.findAll();
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Music> {
    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new Error('invalid token');
    }
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).userId;

    return await this.musicsService.findOne(Number(id), userId);
  }

  @Roles(RoleEnum.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ): Promise<Music> {
    return await this.musicsService.update(Number(id), updateMusicDto);
  }

  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.musicsService.remove(Number(id));
  }
}
