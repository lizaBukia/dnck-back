import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Public } from './guard/publick.key';
import { LoginInterface } from './interfaces/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginInterface> {
    return this.authsService.login(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authsService.register(signUpDto);
  }
}
