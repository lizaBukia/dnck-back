import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
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
  @UseInterceptors(FileInterceptor('src'))
  @Roles(RoleEnum.Admin)
  @Post()
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'audio/mpeg' })
        .addMaxSizeValidator({ maxSize: 50000 * 10000 * 1000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() createMusicDto: CreateMusicDto,
    @Req() req: Request,
  ): Promise<Music> {
    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new Error('invalid token');
    }
    return await this.musicsService.create(createMusicDto, file, token);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async findAll(@Query() query: SearchQueryDto): Promise<Music[]> {
    return await this.musicsService.findAll(query);
  }

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Music> {
    return await this.musicsService.findOne(Number(id));
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
