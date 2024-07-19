import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto } from './dto/create-search.dto';
import { SearchResponseDto } from './dto/search-result.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() searchDto: SearchDto): Promise<SearchResponseDto> {
    return await this.searchService.search(searchDto.search);
  }
}
