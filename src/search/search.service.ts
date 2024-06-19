import { Injectable } from '@nestjs/common';
import { AlbumInterface } from 'src/albums/interfaces/album.interface';
import { AlbumsRepository } from 'src/albums/repositories/albums.repository';
import { AuthorInterface } from 'src/author/interfaces/author.interface';
import { AuthorsRepository } from 'src/author/repository/authors.repository';
import { UserInterface } from 'src/users/interfaces/user.interface';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { SearchDto } from './dto/search.dto';
import { SearchResultInterface } from './interfaces/search.interface';

@Injectable()
export class SearchService {
  constructor(
    private albumsRepository: AlbumsRepository,
    private usersRepository: UsersRepository,
    private authorsRepository: AuthorsRepository,
  ) {}

  findAll(searchDto: SearchDto): SearchResultInterface {
    const loweredSearch: string = searchDto.search.toLowerCase();
    const searching: SearchResultInterface = {
      albums: [],
      users: [],
      authors: [],
    };

    const allAuthors: AuthorInterface[] = this.authorsRepository.findAll();
    for (const author of allAuthors) {
      if (
        this.matchesSearch(author.firstName, loweredSearch) ||
        this.matchesSearch(author.lastName, loweredSearch)
      ) {
        searching.authors.push(author);
      }
    }

    const users: UserInterface[] = this.usersRepository.findAll();
    for (const user of users) {
      if (
        this.matchesSearch(user.firstName, loweredSearch) ||
        this.matchesSearch(user.lastName, loweredSearch)
      ) {
        searching.users.push(user);
      }
    }

    const albums: AlbumInterface[] = this.albumsRepository.findAll();
    for (const album of albums) {
      if (
        this.matchesSearch(album.title, loweredSearch) ||
        this.matchesSearch(album.artistName, loweredSearch)
      ) {
        searching.albums.push(album);
      }
    }

    return searching;
  }

  private matchesSearch(value: string, search: string): boolean {
    return value.toLowerCase().includes(search);
  }
}
