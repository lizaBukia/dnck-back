import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorInterface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';
import { AuthorsRepository } from './repository/authors.repository';

@Injectable()
export class AuthorsService {
  constructor(private authorsRepository: AuthorsRepository) {}

  create(createAuthorDto: CreateAuthorDto): AuthorInterface {
    return this.authorsRepository.create(createAuthorDto);
  }

  findAll(): AuthorInterface[] {
    return this.authorsRepository.findAll();
  }

  findOne(id: number): AuthorInterface {
    const author: FindOneAuthorInterface = this.authorsRepository.findOne(id);
    delete author.index;
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): AuthorInterface {
    return this.authorsRepository.update(id, updateAuthorDto);
  }

  remove(id: number): AuthorInterface[] {
    return this.authorsRepository.remove(id);
  }
}
