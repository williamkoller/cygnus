import { Module } from '@nestjs/common'
import { PlayersController } from './presentation/controllers/players/players.controller'
import { PlayersService } from './presentation/services/players/players.service'

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class AppModule { }
