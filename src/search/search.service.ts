import { Injectable } from '@nestjs/common';
import { AlbumInterface } from 'src/albums/interfaces/album.interface';
import { AlbumsRepository } from 'src/albums/repositories/albums.repository';
import { AuthorInterface } from 'src/author/interfaces/author.interface';
import { AuthorsRepository } from 'src/author/repository/authors.repository';
import { UserInterface } from 'src/users/interfaces/user.interface';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { SearchType } from './search.interface';

@Injectable()
export class SearchService {
  constructor(
    private albumsRepository: AlbumsRepository,
    private usersRepository: UsersRepository,
    private authorsRepository: AuthorsRepository,
  ) {}
  find(search: string): SearchType {
    search = search.toLowerCase();
    const searching: SearchType = {
      albums: [],
      users: [],
      authors: [],
    };
    const allAuthors: AuthorInterface[] = this.authorsRepository.findAll();
    for (let i: number = 0; i < allAuthors.length; i++) {
      if (
        allAuthors[i].firstName.toLowerCase().includes(search) ||
        allAuthors[i].lastName.toLowerCase().includes(search)
      ) {
        searching.authors.push(allAuthors[i]);
      }
    }

    const users: UserInterface[] = this.usersRepository.findAll();
    for (let i: number = 0; i < users.length; i++) {
      if (
        users[i].firstName.toLowerCase().includes(search) ||
        users[i].lastName.toLowerCase().includes(search)
      ) {
        searching.users.push(users[i]);
      }
    }

    const albums: AlbumInterface[] = this.albumsRepository.findAll();
    for (let i: number = 0; i < albums.length; i++) {
      if (
        albums[i].title.toLowerCase().includes(search) ||
        albums[i].artistName.toLowerCase().includes(search)
      ) {
        searching.albums.push(albums[i]);
      }
    }
    return searching;
  }
}
