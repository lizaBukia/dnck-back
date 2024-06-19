import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorInterface } from '../interfaces/author.interface';
import { FindOneAuthorInterface } from '../interfaces/find-one-author.interface';

@Injectable()
export class AuthorsRepository {
  private authors: AuthorInterface[] = [
    {
      id: 1,
      firstName: 'Jackson',
      lastName: 'michael',
      biography: 'daibada cxovrobs',
    },
  ];

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
    const author: FindOneAuthorInterface = this.findOne(id);
    const { firstName, lastName, biography } = updateAuthorDto;
    const updatedAuthor: AuthorInterface = {
      firstName: firstName || author.firstName,
      lastName: lastName || author.lastName,
      biography: biography || author.biography,
      id: author.id,
    };
    this.authors[author.index] = updatedAuthor;
    return updatedAuthor;
  }

  remove(id: number): AuthorInterface[] {
    const author: FindOneAuthorInterface = this.findOne(id);
    return this.authors.splice(author.index, 1);
  }
}
