import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { jwtConstants } from './auth.constants';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/auth.login.dto';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { LoginInterface } from './interfaces/login.response';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(authDto: AuthDto): Promise<User> {
    const { email, password, confirmPassword }: AuthDto = authDto;

    if (confirmPassword !== password) {
      throw new BadRequestException('Password Do Not Match');
    }

    const salt: string = await bcrypt.genSalt();

    const hashedPassword: string = await bcrypt.hash(password, salt);

    try {
      const user: User = await this.usersRepository.create({
        email,
        password: hashedPassword,
      });
      return user;
    } catch (err) {
      throw new BadRequestException(
        'Email is already in use. Please choose a different email address.',
      );
    }
  }

  async login(loginDto: LoginDto): Promise<LoginInterface> {
    const { email, password } = loginDto;

    const user: User = await this.usersRepository.findEmail(email);

    const isPasswordCorrect: boolean =
      user && (await bcrypt.compare(password, user.password));

    if (isPasswordCorrect) {
      const payload: JwtPayloadInterface = {
        email: user.email,
        password: user.password,
        role: user.role,
        userId: user.id,
      };

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
        }),
      };
    }
  }
}
