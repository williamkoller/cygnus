import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from '../../../domain/models/player/player'
import * as uuid from 'uuid'

@Injectable()
export class PlayersService {

    private players: Player[] = []
    private readonly logger = new Logger(PlayersService.name)

    async createUpdatePlayer(addPlayerDTO: AddPlayerDTO): Promise<void> {
        const { email } = addPlayerDTO

        const playerFound = await this.players.find(player => player.email === email)

        if (playerFound) {
            return await this.update(playerFound, addPlayerDTO)
        }

        await this.create(addPlayerDTO)
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

    async consultAllPlayer(): Promise<Player[]> {
        return this.players
    }

    private async update(playerFound: Player, addPlayerDTO: AddPlayerDTO): Promise<void> {
        const { name } = addPlayerDTO
        playerFound.name = name
    }

    async consultPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.players.find(player => player.email === email)
        if(playerFound) {
            throw new NotFoundException(`Player with ${email} not found`)
        }
        return playerFound
    }
}
