import { Injectable, NotFoundException } from '@nestjs/common'
import { AddPlayerDTO } from '../../../domain/models/dto/add-player/add-player-dto'
import { Player } from '../../../domain/models/player/player'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

    async createUpdatePlayer(addPlayerDTO: AddPlayerDTO): Promise<Player> {
        const { email } = addPlayerDTO
        const playerFound = await this.playerModel.findOne({ email }).exec()
        if (playerFound) {
            return await this.update(addPlayerDTO)
        }
        return await this.create(addPlayerDTO)
    }

    private async create(addPlayerDTO: AddPlayerDTO): Promise<Player> {
        const createdPlayer = new this.playerModel(addPlayerDTO)
        return await createdPlayer.save()
    }

    async consultAllPlayer(): Promise<Player[]> {
        return await this.playerModel.find({}, { __v: false }).sort({ name: +1 }).exec()
    }

    private async update(addPlayerDTO: AddPlayerDTO): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({ email: addPlayerDTO.email }, { $set: addPlayerDTO }).exec()
    }

    async consultPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ email }, { __v: false }).exec()
        if (!playerFound) {
            throw new NotFoundException(`Player with ${email} not found`)
        }
        return playerFound
    }

    async deletePlayer(email: string): Promise<any> {
        await this.playerModel.remove({ email }).exec()
    }
}
