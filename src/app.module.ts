import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './author/artists.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [UsersModule, AlbumsModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
