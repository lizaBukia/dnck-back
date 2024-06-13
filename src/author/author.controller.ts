import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorInterface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): AuthorInterface {
    return this.authorService.create(createAuthorDto);
  }
  @Get()
  findAll(): AuthorInterface[] {
    return this.authorService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): FindOneAuthorInterface {
    return this.authorService.findOne(Number(id));
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): AuthorInterface {
    return this.authorService.update(Number(id), updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): AuthorInterface[] {
    return this.authorService.remove(Number(id));
  }
}
