import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './gurads/guard.key';
import { LoginInterface } from './interface/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}
  @Post('login')
  @Public()
  login(@Body() authDto: AuthDto): Promise<LoginInterface> {
    return this.authsService.login(authDto);
  }
  @Public()
  @Post()
  register(@Body() authdto: AuthDto): Promise<User> {
    return this.authsService.register(authdto);
  }
}
