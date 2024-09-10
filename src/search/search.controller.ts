import { Controller, Get, Query } from '@nestjs/common';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { SearchQueryDto } from './dto/create-search.dto';
import { SearchResponseDto } from './dto/search-result.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Roles(RoleEnum.Admin, RoleEnum.User)
  @Get()
  async search(
    @Query() searchQueryDto: SearchQueryDto,
  ): Promise<SearchResponseDto> {
    return await this.searchService.search(searchQueryDto.search);
  }
}
