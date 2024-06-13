import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorInterface } from '../interfaces/author.interface';
import { FindOneAuthorInterface } from '../interfaces/find-one-author.interface';

@Injectable()
export class AuthorsRepository {
  private authors: AuthorInterface[] = [];

  create(createAuthorDto: CreateAuthorDto): AuthorInterface {
    const newAuthor: AuthorInterface = {
      id: this.authors.length + 1,
      ...createAuthorDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findAll(): AuthorInterface[] {
    return this.authors;
  }

  findOne(id: number): FindOneAuthorInterface {
    for (let i: number = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === id) {
        return { index: i, ...this.authors[i] };
      }
    }
    return null;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): AuthorInterface {
    const updateAuthor: FindOneAuthorInterface = this.findOne(id);
    const { firstName, lastName, biography } = updateAuthorDto;
    const newAuthor: AuthorInterface = {
      firstName: firstName || updateAuthor.firstName,
      lastName: lastName || updateAuthor.lastName,
      biography: biography || updateAuthor.biography,
      id: updateAuthor.id,
    };
    this.authors[updateAuthor.index] = newAuthor;
    return newAuthor;
  }

  remove(id: number): AuthorInterface[] {
    const author: FindOneAuthorInterface = this.findOne(id);
    return this.authors.splice(author.index, 1);
  }
}
