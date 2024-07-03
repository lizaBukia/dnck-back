import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { AlbumEntity } from './albums/entities/album.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './author/authors.module';
import { MusicsModule } from './musics/musics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MusicsModule,
    AlbumsModule,
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11998631a&X',
      entities: [AlbumEntity],
      database: 'davaleba',
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
