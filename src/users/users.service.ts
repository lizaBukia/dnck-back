import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { User } from './entities/users.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUsersDto: CreateUsersDto): Promise<User> {
    return await this.usersRepository.create(createUsersDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<User> {
    return await this.usersRepository.update(id, updateUsersDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.remove(id);
  }
  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    return await this.usersRepository.changePassword(id, changePasswordDto);
  }
}
