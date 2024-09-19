import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { LoginDto } from './dto/auth.login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { LoginInterface } from './interfaces/login.response';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpDto): Promise<User> {
    const { email, password, confirmPassword }: SignUpDto = signUpDto;

    if (confirmPassword !== password) {
      throw new BadRequestException('Password Do Not Match');
    }

    const salt: string = await bcrypt.genSalt();

    const hashedPassword: string = await bcrypt.hash(password, salt);

    try {
      const existingUser: User = await this.usersRepository.findEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      const user: User = await this.usersRepository.create({
        email,
        password: hashedPassword,
      });
      return user;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async login(loginDto: LoginDto): Promise<LoginInterface> {
    const { email, password } = loginDto;

    const user: User | null = await this.usersRepository.findEmail(email);

    const isPasswordCorrect: boolean =
      user && (await bcrypt.compare(password, user.password));

    if (isPasswordCorrect) {
      const payload: JwtPayloadInterface = {
        role: user.role,
        id: user.id,
      };

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    }
  }
}
