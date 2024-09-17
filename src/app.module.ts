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
import { History } from './history/entity/history.entity';
import { HistoryModule } from './history/history.module';
import { Music } from './musics/entities/musics.entity';
import { MusicsModule } from './musics/musics.module';
import { Playlist } from './playlists/entities/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { SearchModule } from './search/search.module';
import { Statistic } from './statistics/entity/statistic.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { StorageModule } from './storage/storage.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MusicsModule,
    ArtistsModule,
    AlbumsModule,
    MusicsModule,
    PlaylistsModule,
    AuthModule,
    SearchModule,
    StatisticsModule,
    StorageModule,
    HistoryModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      entities: [
        Album,
        Music,
        ArtistEntity,
        Playlist,
        History,
        Statistic,
        User,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
