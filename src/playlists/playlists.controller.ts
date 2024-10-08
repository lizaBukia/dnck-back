import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
import { DeleteResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Post()
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @Req() req: { user: { id: number } },
  ): Promise<Playlist> {
    return await this.playlistsService.create(createPlaylistDto, req.user?.id);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async findAll(@Query() query: SearchQueryDto): Promise<Playlist[]> {
    return await this.playlistsService.findAll(query);
  }

  @Roles(RoleEnum.User, RoleEnum.Admin)
  @Get('personal')
  async getPersonalPlaylists(
    @Req() req: { user: { id: number } },
  ): Promise<Playlist[]> {
    return await this.playlistsService.getPersonal(req.user.id);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Playlist> {
    return await this.playlistsService.findOne(Number(id));
  }

  @Roles(RoleEnum.User, RoleEnum.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @Req() req: { user: { id: number; role: string } },
  ): Promise<Playlist> {
    return await this.playlistsService.update(
      Number(id),
      updatePlaylistDto,
      req.user.id,
      req.user.role === RoleEnum.Admin,
    );
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: { user: { id: number } },
  ): Promise<DeleteResult> {
    return await this.playlistsService.remove(Number(id), req.user.id);
  }
}
