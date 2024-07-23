import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artist/artists.module';
import { AuthModule } from './auth/auth.module';
import { MusicsModule } from './musics/musics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MusicsModule,
    AlbumsModule,
    ArtistsModule,
    TypeOrmModule.forRoot({
      port: 3306,
      database: 'dnck',
      username: 'root',
      password: 'Newpassword123!',
      synchronize: true,
      autoLoadEntities: true,
      type: 'mysql',
      host: 'localhost',
    }),
    MusicsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
