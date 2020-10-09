import { Module } from '@nestjs/common'
import { PlayersController } from './presentation/controllers/players/players.controller'
import { PlayersModule } from './presentation/controllers/players/players.module'

@Module({
  imports: [PlayersModule],
  controllers: [PlayersController],
  providers: [],
})
export class AppModule { }
