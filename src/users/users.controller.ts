import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles(RoleEnum.Admin)
  @Post()
  async create(@Body() createUsersDto: CreateUsersDto): Promise<User> {
    return await this.usersService.create(createUsersDto);
  }
  @Roles(RoleEnum.Admin)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
  @Roles(RoleEnum.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }
  @Roles(RoleEnum.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<User> {
    return await this.usersService.update(Number(id), updateUsersDto);
  }
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.usersService.remove(Number(id));
  }
}
