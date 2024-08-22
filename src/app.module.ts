import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/entities/album.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artist/artists.module';
import { ArtistEntity } from './artist/entities/artist.entity';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { Music } from './musics/entities/musics.entity';
import { MusicsModule } from './musics/musics.module';
import { Playlist } from './playlists/entities/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { SearchModule } from './search/search.module';
import { StatisticsModule } from './statistics/statistics.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MusicsModule,
    ArtistsModule,
    AlbumsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      port: 3306,
      host: 'localhost',
      username: 'root',
      type: 'mysql',
      password: 'Newpassword123!',
      database: 'dnck',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Album, Music, ArtistEntity, Playlist],
    }),
    MusicsModule,
    PlaylistsModule,
    AuthModule,
    SearchModule,
    StatisticsModule,
    StorageModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
