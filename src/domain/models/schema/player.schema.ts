import { timeStamp } from 'console'
import * as mongoose from 'mongoose'

export const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    ranking: {
        type: String,
        required: true
    },
    rankingPosition: {
        type: String,
        required: true
    },
    urlPhotoPlayer: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    collection: 'players'
})