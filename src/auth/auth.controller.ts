import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginInterface } from './interface/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}

  @Post('login')
  login(@Body() authDto: AuthDto): Promise<LoginInterface> {
    return this.authsService.login(authDto);
  }

  @Post('register')
  register(@Body() authDto: AuthDto): Promise<User> {
    return this.authsService.register(authDto);
  }
}
