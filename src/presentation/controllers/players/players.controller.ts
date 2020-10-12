import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { PlayersService } from '../../services/players/players.service'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from 'src/domain/models/player/player'
import { PlayersValidationsParametersPipes } from 'src/main/pipes/players-validations-parameters.pipes'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) { }
    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() addPlayerDTO: AddPlayerDTO): Promise<Player> {
        return await this.playersService.createPlayer(addPlayerDTO)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() addPlayerDTO: AddPlayerDTO, 
        @Param('_id', PlayersValidationsParametersPipes) _id: string): Promise<Player> {
        return await this.playersService.updatePlayer(_id, addPlayerDTO)
    }

    @Get()
    async consultPlayer(): Promise<Player[]> {
        return await this.playersService.consultAllPlayer()
    }

    @Get('/:_id')
    async consultPlayerById(@Param('_id', PlayersValidationsParametersPipes) _id: string): Promise<Player> {
        return await this.playersService.consultPlayerById(_id)
    }

    @Delete('/:_id')
    async deletePlayer(@Param('_id', PlayersValidationsParametersPipes) _id: string): Promise<void> {
        await this.playersService.deletePlayer(_id)
    }
}
