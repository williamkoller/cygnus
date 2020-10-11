import { Module, CacheModule, CacheInterceptor } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PlayersController } from './presentation/controllers/players/players.controller'
import { PlayersService } from './presentation/services/players/players.service'
import env from './config/env'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(`${env.mongoUri}`),
    CacheModule.register(),
  ],
  controllers: [PlayersController],
  providers: [
    PlayersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class AppModule { }
