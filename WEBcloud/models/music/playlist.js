import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const playlistSchema = new schema({
    ID: {
        type: String,
    },
    name: {
        type: String,
    },
    duration: {
        type: Number,
    },
    songcount: {
        type: Number,
    },
    Ownername: {
        type: String,
    },
    public: {
        type: Boolean,
    },
    







})