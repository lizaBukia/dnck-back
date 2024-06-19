import { Controller, Get, Query } from '@nestjs/common';
import { SearchType } from './search.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get()
  find(@Query('search') search: string): SearchType {
    return this.searchService.find(search);
  }
}
