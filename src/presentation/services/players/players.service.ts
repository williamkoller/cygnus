import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from '../../../domain/models/player/player'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdatePlayerDTO } from 'src/domain/models/dto/update-player/update-player-dto'

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

    async createPlayer(addPlayerDTO: AddPlayerDTO): Promise<Player> {
        const { email } = addPlayerDTO
        const playerFound = await this.playerModel.findOne({ email }).exec()
        if (playerFound) {
            throw new BadRequestException(`player with that ${email} already used`)
        }
        const createdPlayer = new this.playerModel(addPlayerDTO)
        return await createdPlayer.save()
    }

    async updatePlayer(_id: string, updatePlayerDTO: UpdatePlayerDTO): Promise<Player> {
        const playerfound = await this.playerModel.findOne({ _id }).exec()

        if (!playerfound) {
            throw new NotFoundException(`player with ${_id} not found`)
        }
        return await this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDTO })
    }

    async consultAllPlayer(): Promise<Player[]> {
        return await this.playerModel.find({}, { __v: false }).sort({ name: +1 }).exec()
    }


    async consultPlayerById(_id: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ _id }, { __v: false }).exec()
        if (!playerFound) {
            throw new NotFoundException(`Player with ${_id} not found`)
        }
        return playerFound
    }

    async deletePlayer(_id: string): Promise<void> {
        const playerFound = await this.playerModel.findOne({ _id }, { __v: false }).exec()
        if (!playerFound) {
            throw new NotFoundException(`Player with ${_id} not found`)
        }
        await this.playerModel.deleteOne({ _id }).exec()
    }
}
