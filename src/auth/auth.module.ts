import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './gurads/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UsersRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
