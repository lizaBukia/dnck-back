import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicsModule } from './musics/musics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, MusicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
