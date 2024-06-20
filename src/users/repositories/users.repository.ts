import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UpdateUsersDto } from '../dto/update-users.dto';
import { FindOneUserInterface } from '../interfaces/find-one-user.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UsersRepository {
  private users: UserInterface[] = [];

  create(data: CreateUsersDto): UserInterface {
    const newUser: UserInterface = {
      id: (this.users[this.users.length - 1]?.id || 0) + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      birthYear: data.birthYear,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): UserInterface[] {
    return this.users;
  }

  findOne(id: number): FindOneUserInterface {
    for (let i: number = 0; i < this.users.length; i++) {
      if (id == this.users[i].id)
        return {
          ...this.users[i],
          index: i,
        };
    }
  }

  update(id: number, data: UpdateUsersDto): UserInterface {
    const user: FindOneUserInterface = this.findOne(id);
    const updatedUser: UserInterface = {
      id: user.id,
      lastName: data.lastName || user.lastName,
      firstName: data.firstName || user.firstName,
      birthYear: data.birthYear || user.birthYear,
    };
    this.users[user.index] = updatedUser;
    return updatedUser;
  }

  remove(id: number): UserInterface[] {
    const user: FindOneUserInterface = this.findOne(id);
    return this.users.splice(user.index, 1);
  }
}
