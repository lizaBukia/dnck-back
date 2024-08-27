import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './guard/publick.key';
import { LoginInterface } from './interface/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() authDto: AuthDto): Promise<LoginInterface> {
    return this.authsService.login(authDto);
  }
  @Public()
  register(@Body() authDto: AuthDto): Promise<User> {
    return this.authsService.register(authDto);
  }
}
