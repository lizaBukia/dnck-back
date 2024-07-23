import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './gurads/guard.key';
import { LoginInterface } from './interface/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}
  @Post()
  @Public()
  login(@Body() authDto: AuthDto): Promise<LoginInterface> {
    return this.authsService.login(authDto);
  }
}
