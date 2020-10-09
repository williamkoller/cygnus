import { Body, Controller, Post } from '@nestjs/common'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'

@Controller('api/v1/players')
export class PlayersController {
    @Post()
    async createUpdatePlayer(@Body() addPlayerDTO: AddPlayerDTO) {
        const { email } = addPlayerDTO
        return {
            email
        }
    }
}
