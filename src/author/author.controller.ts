import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './author.service';
import { CreateAuthhorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorInteface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';

@Controller('author')
export class AuthorController {
  constructor(private authService: AuthService) {}
  @Post()
  create(@Body() createAuthorDto: CreateAuthhorDto): AuthorInteface {
    return this.authService.create(createAuthorDto);
  }
  @Get(':id')
  findOne(@Param('id') id: number): FindOneAuthorInterface {
    return this.authService.findOne(id);
  }
  @Get()
  getAll(): AuthorInteface[] {
    return this.authService.getAll();
  }
  //   @Delete('id')
  //   delete(@Param('id') id: number): AuthorInteface {
  //     return this.authService.(id);
  //   }
  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): AuthorInteface {
    return this.authService.update(id, updateAuthorDto);
  }
}
