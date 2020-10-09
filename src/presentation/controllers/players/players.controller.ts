import { Body, Controller, Get, Post } from '@nestjs/common'
import { PlayersService } from '../../services/players/players.service'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from 'src/domain/models/player/player'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) { }
    @Post()
    async createUpdatePlayer(@Body() addPlayerDTO: AddPlayerDTO): Promise<void> {
        await this.playersService.createUpdatePlayer(addPlayerDTO)
    }

    @Get()
    async consultPlayer(): Promise<Player[]> {
        return this.playersService.consultAllPlayer()
    }
}
