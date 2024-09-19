import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/auth.login.dto';
import { Public } from './guard/publick.key';
import { LoginInterface } from './interfaces/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() authDto: LoginDto): Promise<LoginInterface> {
    console.log('sds');
    
    return this.authsService.login(authDto);
  }
  @Public()
  @Post('register')
  register(@Body() loginDto: AuthDto): Promise<User> {
    return this.authsService.register(loginDto);
  }
}
