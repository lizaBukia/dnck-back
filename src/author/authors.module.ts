import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsRepository } from './repository/authors.repository';

@Module({
  providers: [AuthorsService, AuthorsRepository],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
