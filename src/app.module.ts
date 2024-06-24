import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [UsersModule, AlbumsModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
