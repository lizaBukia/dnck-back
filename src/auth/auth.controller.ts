import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RoleEnum } from './enum/user.role';
import { Roles } from './guard/roles.key';
import { LoginInterface } from './interface/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}
  @Roles(RoleEnum.User)
  @Post('login')
  login(@Body() authDto: AuthDto): Promise<LoginInterface> {
    return this.authsService.login(authDto);
  }
  @Post('register')
  register(@Body() authDto: AuthDto): Promise<User> {
    return this.authsService.register(authDto);
  }
}
