import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { ArtistssService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistssService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Roles(RoleEnum.Admin)
  @Post()
  create(
    @Body() createArtistDto: CreateArtistDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image' })
        .addMaxSizeValidator({ maxSize: 50000 * 10000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ArtistEntity> {
    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new Error('invalid token');
    }
    return this.artistsService.create(createArtistDto, file, token);
  }
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @Get()
  findAll(@Query() query: SearchQueryDto): Promise<ArtistEntity[]> {
    return this.artistsService.findAll(query);
  }
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ArtistEntity> {
    return this.artistsService.findOne(Number(id));
  }
  @Roles(RoleEnum.Admin)
  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.update(Number(id), updateArtistDto);
  }
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.artistsService.remove(Number(id));
  }
}
