import { Body, Controller, Get, Post, Query } from '@nestjs/common'
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
    async consultPlayer(
        @Query('email') email: string
    ): Promise<Player[] | Promise<Player>> {
        if (email) {
            return await this.playersService.consultPlayerByEmail(email)
        }
        return await this.playersService.consultAllPlayer()
    }
}
