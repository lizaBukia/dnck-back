import { Injectable } from '@nestjs/common';
import { CreateAuthhorDto } from './dto/create-author.dto';
import { AuthorInterface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';
import { AuthorRepository } from './repository/author.repository';

@Injectable()
export class AuthService {
  constructor(private authorRepository: AuthorRepository) {}
  create(createAuthorDto: CreateAuthhorDto): AuthorInterface {
    return this.authorRepository.create(createAuthorDto);
  }
  findOne(id: number): FindOneAuthorInterface {
    return this.authorRepository.findOne(id);
  }
  getAll(): AuthorInterface[] {
    return this.authorRepository.getAll();
  }

  update(id: number, authorInterface: AuthorInterface): AuthorInterface {
    return this.authorRepository.update(id, authorInterface);
  }

  remove(id: number): AuthorInterface[] {
    return this.authorRepository.remove(id);
  }
}
