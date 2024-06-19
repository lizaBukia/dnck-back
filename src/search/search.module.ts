import { Module } from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/repositories/albums.repository';
import { AuthorsRepository } from 'src/author/repository/authors.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [
    SearchService,
    AlbumsRepository,
    UsersRepository,
    AuthorsRepository,
  ],
})
export class SearchModule {}
