import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './repository/author.repository';

@Module({
  providers: [AuthorService, AuthorRepository],
  controllers: [AuthorController],
})
export class AuthorModule {}
