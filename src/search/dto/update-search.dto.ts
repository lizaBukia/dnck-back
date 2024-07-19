import { PartialType } from '@nestjs/swagger';
import { SearchDto } from './create-search.dto';

export class UpdateSearchDto extends PartialType(SearchDto) {}
