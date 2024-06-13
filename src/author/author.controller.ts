import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorInterface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';

@Controller('author')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): AuthorInterface {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll(): AuthorInterface[] {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): FindOneAuthorInterface {
    return this.authorsService.findOne(Number(id));
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): AuthorInterface {
    return this.authorsService.update(Number(id), updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): AuthorInterface[] {
    return this.authorsService.remove(Number(id));
  }
}
