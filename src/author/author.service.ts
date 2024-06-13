import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorInterface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';
import { AuthorRepository } from './repository/author.repository';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  create(createAuthorDto: CreateAuthorDto): AuthorInterface {
    return this.authorRepository.create(createAuthorDto);
  }

  findAll(): AuthorInterface[] {
    return this.authorRepository.findAll();
  }

  findOne(id: number): FindOneAuthorInterface {
    return this.authorRepository.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): AuthorInterface {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  remove(id: number): AuthorInterface[] {
    return this.authorRepository.remove(id);
  }
}
