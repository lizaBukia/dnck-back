import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/entities/album.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artist/artists.module';
import { ArtistEntity } from './artist/entities/artist.entity';
import { Music } from './musics/entities/musics.entity';
import { MusicsModule } from './musics/musics.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MusicsModule,
    ArtistsModule,
    AlbumsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11998631a&X',
      entities: [Album, Music, ArtistEntity],
      database: 'davaleba',
      synchronize: true,
    }),
    MusicsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
