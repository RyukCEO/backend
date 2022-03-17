import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new schema({ 
    uid: {
        type: String,
        required: false,
      },
    name: {
        type: String,
        required: false,
      },
    coverArt: {
        type: String,
    },
    artistID: {
        type: String,
        required: false,
      },
    allArtistIDs: {
        type: String,
    },

    songcount: {
        type: String,
        required: false,
    },
    uid: {
        type: String,
        required: false,
      },
    uid: {
        type: String,
        required: false,
      },
    uid: {
        type: String,
        required: false,
    },



})