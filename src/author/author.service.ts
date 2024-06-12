import { Injectable } from '@nestjs/common';
import { CreateAuthhorDto } from './dto/create-author.dto';
import { AuthorInteface } from './interfaces/author.interface';
import { FindOneAuthorInterface } from './interfaces/find-one-author.interface';
import { AuthorRepository } from './repository/author.repository';

@Injectable()
export class AuthService {
  constructor(private authorRepository: AuthorRepository) {}
  create(createAuthorDto: CreateAuthhorDto): AuthorInteface {
    return this.authorRepository.create(createAuthorDto);
  }
  findOne(id: number): FindOneAuthorInterface {
    return this.authorRepository.findOne(id);
  }
  getAll(): AuthorInteface[] {
    return this.authorRepository.getAll();
  }
  //   delete(id: number): FindOneAuthorInterface  {
  //     return this.authorRepository.delete(id);
  //   }
  update(id: number, authorInterface: AuthorInteface): AuthorInteface {
    return this.authorRepository.update(id, authorInterface);
  }
}
