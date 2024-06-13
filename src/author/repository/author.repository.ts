import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorInterface } from '../interfaces/author.interface';
import { FindOneAuthorInterface } from '../interfaces/find-one-author.interface';

@Injectable()
export class AuthorRepository {
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
    const find: AuthorInterface = this.findOne(id);
    const { firstName, lastName, biography } = updateAuthorDto;
    const updateAuthor: AuthorInterface = find;
    updateAuthor.firstName = firstName;
    updateAuthor.lastName = lastName;
    updateAuthor.biography = biography;
    return updateAuthor;
  }

  remove(id: number): AuthorInterface[] {
    const author: FindOneAuthorInterface = this.findOne(id);
    return this.authors.splice(author.index, 1);
  }
}
