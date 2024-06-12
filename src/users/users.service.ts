import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { FindOneUserInterface } from './interfaces/find-one-user.interface';
import { UserInterface } from './interfaces/user.interface';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUsersDto: CreateUsersDto): UserInterface {
    return this.usersRepository.create(createUsersDto);
  }

  findAll(): UserInterface[] {
    return this.usersRepository.findAll();
  }

  findOne(id: number): UserInterface {
    const user: FindOneUserInterface = this.usersRepository.findOne(id);
    delete user.index;
    return user;
  }

  update(id: number, updateUsersDto: UpdateUsersDto): UserInterface {
    return this.usersRepository.update(id, updateUsersDto);
  }

  remove(id: number): UserInterface[] {
    return this.usersRepository.remove(id);
  }
}
