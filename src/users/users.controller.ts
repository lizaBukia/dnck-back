import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RoleEnum } from '../auth/enum/user.role';
import { Roles } from '../auth/guard/roles.key';
import { ChangePasswordDto } from './dto/change-password.dto';
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

  @Delete('personal')
  async removePersonal(
    @Req() req: { user: { id: number } },
  ): Promise<DeleteResult> {
    return await this.usersService.remove(req.user.id);
  }
  @Roles(RoleEnum.Admin)
  @Patch('password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    console.log(changePasswordDto);
    return await this.usersService.changePassword(
      Number(id),
      changePasswordDto,
    );
  }
  @Roles(RoleEnum.Admin)
  @Patch('unblock/:id')
  async UnblockUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.unblockUser(Number(id));
  }
}
