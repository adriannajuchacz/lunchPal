import * as mongoose from 'mongoose';


export const ReportMongoSchema = new mongoose.Schema({
    // user_id: String,
    reportee: String,
    reporter: String,
    comment: String
})
