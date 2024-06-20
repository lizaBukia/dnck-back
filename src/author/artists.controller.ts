import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArtistssService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateAuthorDto } from './dto/update-artist.dto';
import { ArtistInterface } from './interfaces/artists.interface';

@Controller('author')
export class ArtistsController {
  constructor(private artistsService: ArtistssService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): ArtistInterface {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll(): ArtistInterface[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ArtistInterface {
    return this.artistsService.findOne(Number(id));
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): ArtistInterface {
    return this.artistsService.update(Number(id), updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): ArtistInterface[] {
    return this.artistsService.remove(Number(id));
  }
}
