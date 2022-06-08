import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const artistSchema = new schema({
    ID: {
        type: String,
    },
    name: {
        type: String,
    },
    albumCount: {
        type: Number,
    },
    songcount: {
        type: Number,
    },
    Biography: {
        type: String,
    }







})