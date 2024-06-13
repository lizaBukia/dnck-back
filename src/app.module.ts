import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MusicsModule} from './musics/musics.module';

@Module({
  imports: [UsersModule, MusicsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
