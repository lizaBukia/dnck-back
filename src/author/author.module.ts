import { Module } from '@nestjs/common';
import { AuthorsController } from './author.controller';
import { AuthorsService } from './author.service';
import { AuthorsRepository } from './repository/author.repository';

@Module({
  providers: [AuthorsService, AuthorsRepository],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
