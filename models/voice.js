import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Voiceschema = new Schema({ 
    guild_id: {
        type: snowflake,
    },
    channel_id: {
        type: snowflake,
    },
    user_id : {
        type: snowflake,
    },
    member: {
        type: ObjectId,
    },
    session_id : {
        type: String,
    },
    deaf : {
        type: Boolean,
    },
    self_deaf	 : {
        type: Boolean,
    },
    self_mute : {
        type: Boolean,
    },
    self_stream : {
        type: Boolean,
    },
    self_video : {
        type: Boolean,
    },
    suppress : {
        type: Boolean,
    },
    request_to_speak_timestamp : {

    },

})

var VoiceRegionschema = new Schema ({
    region : {
        type: String,
    },
    optimal : {
        type: Boolean,
    },
    deprecated : {
        type: Boolean,
    },
    //
    custom : {
        type: Boolean,
    },
    

})