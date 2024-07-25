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
import { Playlist } from './playlists/entities/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MusicsModule,
    ArtistsModule,
    AlbumsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Novatori123456789!@#',
      entities: [Album, Music, ArtistEntity, Playlist],
      database: 'dnckback',
      synchronize: true,
    }),
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
