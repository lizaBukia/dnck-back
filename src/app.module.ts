import { Module } from '@nestjs/common';
import { albumsModule } from './albums/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [albumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
