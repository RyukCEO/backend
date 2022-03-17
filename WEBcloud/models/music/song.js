import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const artistSchema = new schema({
    ID: {
        type: String,
    },
    title: {
        type: String,
    },
    artistID: {
        type: Number,
    },
    lyric: {
        type: Number,
    },
    Biography: {
        type: String,
    }







})