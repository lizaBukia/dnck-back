import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    TypeOrmModule.forRoot({
      port: 3306,
      database: 'artists',
      username: 'root',
      password: 'NovaNova123!@',
      synchronize: true,
      autoLoadEntities: true,
      type: 'mysql',
      host: 'localhost',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
