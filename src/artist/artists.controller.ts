import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SearchQueryDto } from 'src/search/dto/create-search.dto';
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
  @Roles(RoleEnum.Admin)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return this.artistsService.create(createArtistDto);
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
