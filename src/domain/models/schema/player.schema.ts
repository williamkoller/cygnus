import { timeStamp } from 'console'
import * as mongoose from 'mongoose'

export const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    ranking: {
        type: String,
    },
    rankingPosition: {
        type: String,
    },
    urlPhotoPlayer: {
        type: String,
    }

}, {
    timestamps: true,
    collection: 'players'
})