import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { PlayersService } from '../../services/players/players.service'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from 'src/domain/models/player/player'
import { PlayersValidationsParametersPipes } from 'src/main/pipes/players-validations-parameters.pipes'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) { }
    @Post()
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() addPlayerDTO: AddPlayerDTO): Promise<Player> {
        return await this.playersService.createUpdatePlayer(addPlayerDTO)
    }

    @Get()
    async consultPlayer(
        @Query('email', PlayersValidationsParametersPipes) email: string
    ): Promise<Player[] | Promise<Player>> {
        if (email) {
            return await this.playersService.consultPlayerByEmail(email)
        }
        return await this.playersService.consultAllPlayer()
    }

    @Delete()
    async deletePlayer(@Query('email', PlayersValidationsParametersPipes) email: string): Promise<void> {
        await this.playersService.deletePlayer(email)
    }
}
