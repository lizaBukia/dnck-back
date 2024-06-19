import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchResultInterface } from './interfaces/search.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get()
  findAll(@Query() searchDto: SearchDto): SearchResultInterface {
    return this.searchService.findAll(searchDto);
  }
}
