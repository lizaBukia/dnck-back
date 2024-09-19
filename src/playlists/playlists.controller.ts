import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
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

  @UseInterceptors(FileInterceptor('file'))
  @Roles(RoleEnum.Admin)
  @Post()
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image' })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() createPlaylistDto: CreatePlaylistDto,
    @Req() req: Request,
  ): Promise<Playlist> {
    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new Error('invalid token');
    }

    return await this.playlistsService.create(createPlaylistDto, file, token);
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
    console.log(id);

    return await this.playlistsService.update(Number(id), updatePlaylistDto);
  }

  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.playlistsService.remove(Number(id));
  }
}
