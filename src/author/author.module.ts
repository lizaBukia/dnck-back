import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthService } from './author.service';
import { AuthorRepository } from './repository/author.repository';

@Module({
  providers: [AuthService, AuthorRepository],
  controllers: [AuthorController],
})
export class AuthorModule {}
