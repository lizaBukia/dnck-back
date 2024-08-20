import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoleEnum } from 'src/auth/enum/user.role';
import { Public } from 'src/auth/guard/publick.key';
import { Roles } from 'src/auth/guard/roles.key';
import { DeleteResult } from 'typeorm';
import { ArtistssService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistssService) {}
  @Roles(RoleEnum.User)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<CreateArtistDto> {
    return this.artistsService.create(createArtistDto);
  }
  @Public()
  @Get()
  findAll(): Promise<CreateArtistDto[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ArtistEntity> {
    return this.artistsService.findOne(Number(id));
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.update(Number(id), updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.artistsService.remove(Number(id));
  }
}
