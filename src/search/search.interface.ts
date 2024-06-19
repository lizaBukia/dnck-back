import { AlbumInterface } from 'src/albums/interfaces/album.interface';
import { AuthorInterface } from 'src/author/interfaces/author.interface';
import { UserInterface } from 'src/users/interfaces/user.interface';

export type SearchType = {
  users: UserInterface[];
  authors: AuthorInterface[];
  albums: AlbumInterface[];
};
