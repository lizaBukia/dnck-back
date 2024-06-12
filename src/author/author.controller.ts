import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './author.service';
import { CreateAuthhorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorInterface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';

@Controller('author')
export class AuthorController {
  constructor(private authService: AuthService) {}
  @Post()
  create(@Body() createAuthorDto: CreateAuthhorDto): AuthorInterface {
    return this.authService.create(createAuthorDto);
  }
  @Get(':id')
  findOne(@Param('id') id: number): FindOneAuthorInterface {
    return this.authService.findOne(id);
  }
  @Get()
  getAll(): AuthorInterface[] {
    return this.authService.getAll();
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): AuthorInterface {
    return this.authService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): AuthorInterface[] {
    return this.authService.remove(id);
  }
}
