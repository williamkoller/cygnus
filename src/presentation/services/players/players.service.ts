import { Injectable, Logger } from '@nestjs/common'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from '../../../domain/models/player/player'
import * as uuid from 'uuid'

@Injectable()
export class PlayersService {

    private players: Player[] = []
    private readonly logger = new Logger(PlayersService.name)

    async createUpdatePlayer(addPlayerDTO: AddPlayerDTO): Promise<Player> {
        return await this.create(addPlayerDTO)
    }

    private async create(addPlayerDTO: AddPlayerDTO): Promise<Player> {
        const { name, email, phoneNumber } = addPlayerDTO
        const player = {
            _id: uuid.v4(),
            name,
            email,
            phoneNumber,
            urlPhotoPlayer: 'https://google.com/images.jpg',
            ranking: 'A',
            rankingPosition: 1
        }
        this.logger.log(`addPlayerDTO: ${JSON.stringify(player)}`)
        return player
    }
}
