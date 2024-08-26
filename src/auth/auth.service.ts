import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { jwtConstants } from './auth.constants';
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

    const hashedPassword: string = await bcrypt.hash(password, salt);
    console.log(hashedPassword, 'hashedpassword', password);

    const user: User = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });
    return user;
  }

  async login(authDto: AuthDto): Promise<LoginInterface> {
    const { email, password } = authDto;
    console.log(email, password);

    const user: User = await this.usersRepository.findEmail(email);
    console.log(user);

    const isPasswordCorrect: boolean =
      user && (await bcrypt.compare(password, user.password));

    if (isPasswordCorrect) {
      const payload: {
        email: string;
        password: string;
        role: string;
        userId: number;
      } = {
        email: user.email,
        password: user.password,
        role: user.role,
        userId: user.id,
      };
      console.log(isPasswordCorrect);

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
        }),
      };
    }
  }
}
