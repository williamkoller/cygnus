import { Module, CacheModule, CacheInterceptor } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PlayersController } from './presentation/controllers/players/players.controller'
import { PlayersService } from './presentation/services/players/players.service'
import env from './main/config/env'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerSchema } from './domain/models/schema/player.schema'

@Module({
  imports: [
    MongooseModule.forRoot(`${env.mongoUri}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true }),
    CacheModule.register(),
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }])
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
