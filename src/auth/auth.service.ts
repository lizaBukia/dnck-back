import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { JwtConstants } from './auth.constants';
import { AuthDto } from './dto/auth.dto';
import { LoginInterface } from './interface/login.response';
@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async register(authDto: AuthDto): Promise<User> {
    const { email, password }: AuthDto = authDto;
    const salt: string = await bcrypt.genSalt();
    const hashedpassword: string = await bcrypt.hash(password, salt);
    const user: User = await this.usersRepository.create({
      email,
      password: hashedpassword,
    });
    return user;
  }
  async login(authDto: AuthDto): Promise<LoginInterface> {
    const { email, password } = authDto;
    const user: User = await this.usersRepository.findEmail(email);
    const chekpassword: boolean = await bcrypt.compare(password, user.password);
    if (user && chekpassword) {
      const payload: {
        email: string;
        password: string;
        role: string;
      } = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: JwtConstants.secret,
        }),
      };
    }
  }
}
