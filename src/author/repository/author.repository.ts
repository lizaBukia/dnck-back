import { Injectable } from '@nestjs/common';
import { CreateAuthhorDto } from '../dto/create-author.dto';
import { AuthorInteface } from '../interfaces/author.interface';
import { FindOneAuthorInterface } from '../interfaces/find-one-author.interface';

@Injectable()
export class AuthorRepository {
  private authors: AuthorInteface[] = [];
  create(createAuthorDto: CreateAuthhorDto): AuthorInteface {
    const newAuthor: AuthorInteface = {
      id: this.authors.length + 1,
      ...createAuthorDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findOne(id: number): FindOneAuthorInterface {
    for (let i: number = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === id) {
        return { index: i, ...this.authors[i] };
      }
    }
    return null;
  }

  getAll(): AuthorInteface[] {
    return this.authors;
  }
  //   delete(id: number): unknown {
  //     const author: AuthorInteface = this.findOne(id);
  //     return this.authors.splice(author.index, 1);
  //   }
  update(id: number, authorInterface: AuthorInteface): AuthorInteface {
    const find: AuthorInteface = this.findOne(id);
    const { firstName, lastName, biography } = authorInterface;
    const updateAuthor: AuthorInteface = find;
    updateAuthor.firstName = firstName;
    updateAuthor.lastName = lastName;
    updateAuthor.biography = biography;
    return updateAuthor;
  }
}
