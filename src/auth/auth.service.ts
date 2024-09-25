import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User } from '../users/entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { LoginDto } from './dto/auth.login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { RoleEnum } from './enum/user.role';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { LoginInterface } from './interfaces/login.response';

dotenv.config({ path: '.env' });

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
      throw new BadRequestException(err);
    }
  }

  async login(loginDto: LoginDto): Promise<LoginInterface> {
    const { email, password } = loginDto;

    const user: User | null = await this.usersRepository.findEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    if (user.deletedAt) {
      throw new BadRequestException('user is blocked');
    }

    const isPasswordCorrect: boolean =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid email or password');
    }
    if (isPasswordCorrect) {
      const payload: JwtPayloadInterface = {
        role: user.role === 'user' ? RoleEnum.User : RoleEnum.Admin,
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
