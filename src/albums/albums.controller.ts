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
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UpdateResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}
  @Post()
  @Roles(RoleEnum.User)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAlbomDto: CreateAlbumDto,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image' })
        .addMaxSizeValidator({ maxSize: 50000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ): Promise<Album> {
    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new Error('invalid token');
    }
    return await this.albumService.create(createAlbomDto, token, file);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }
  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return await this.albumService.findOne(Number(id));
  }
  @Roles(RoleEnum.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<UpdateResult> {
    return await this.albumService.update(Number(id), updateAlbumDto);
  }
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UpdateResult> {
    return await this.albumService.remove(Number(id));
  }
}
