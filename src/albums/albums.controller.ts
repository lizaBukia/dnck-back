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
import * as jwt from 'jsonwebtoken';
import { RoleEnum } from 'src/auth/enum/user.role';
import { Public } from 'src/auth/guard/publick.key';
import { Roles } from 'src/auth/guard/roles.key';
import { S3Service } from 'src/storage/s3.service';
import { UpdateResult } from 'typeorm';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly albumService: AlbumsService,
    private readonly s3Service: S3Service,
  ) {}
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
    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);
    
    const userId: number = (decodedToken as jwt.JwtPayload).userId;

    const buffer: Buffer = file.buffer;

    const filename: string = file.originalname;

    const location: string = await this.s3Service.uploadFile(
      buffer,
      filename,
      userId,
    );
    if (location) {
      createAlbomDto.imgUrl = location;
    }
    return await this.albumService.create(createAlbomDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    return await this.albumService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<UpdateResult> {
    return await this.albumService.update(Number(id), updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UpdateResult> {
    return await this.albumService.remove(Number(id));
  }
}
