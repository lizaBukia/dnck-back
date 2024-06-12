import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserInterface } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUsersDto: CreateUsersDto): UserInterface {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  findAll(): UserInterface[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserInterface {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): UserInterface {
    return this.usersService.update(Number(id), updateUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): UserInterface[] {
    return this.usersService.remove(Number(id));
  }
}
