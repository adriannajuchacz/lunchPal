import * as mongoose from 'mongoose';
import { UserMongoSchema } from './user-mongo.schema';



export const LunchPartySchema = new mongoose.Schema({

    day: Date,
    mensa: String,
    maxpals: Number,
    currentpals: Number,
    starttime: String,
    endtime: String,
    users: [String],
    interests: [String]
})
