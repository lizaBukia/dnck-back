import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UpdateUsersDto } from '../dto/update-users.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<User> {
    const newUser: User = await this.usersRepository.create(createUsersDto);
    await this.usersRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUsersDto: UpdateUsersDto): Promise<User> {
    await this.usersRepository.update(id, updateUsersDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.softDelete(id);
  }

  async findEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      withDeleted: true,
    });
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const user: User = await this.findOne(id);

    const salt: string = await bcrypt.genSalt();

    console.log(changePasswordDto.password);

    const hashedPassword: string = await bcrypt.hash(
      changePasswordDto.password,
      salt,
    );

    user.password = hashedPassword;

    return await this.usersRepository.save(user);
  }
}
