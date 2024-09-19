import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { SearchPLaylistQueryDto } from './dto/search-playlist-query.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Roles(RoleEnum.Admin)
  @Post()
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistsService.create(createPlaylistDto);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async findAll(@Query() query: SearchPLaylistQueryDto): Promise<Playlist[]> {
    return await this.playlistsService.findAll(query);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Playlist> {
    return await this.playlistsService.findOne(Number(id));
  }

  @Roles(RoleEnum.Admin)   
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistsService.update(Number(id), updatePlaylistDto);
  }

  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.playlistsService.remove(Number(id));
  }
}
