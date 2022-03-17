import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var serverschema = new Schema({ 
    id: {
        type: snowflake,
    },
    name: {
        type: snowflake,
    },
    icon: {
        type: snowflake,
    },
    isowner: {
        type: snowflake,
    },
    //id of owner
    owners_id: {
        type: snowflake,
    },
    permissions: {
        type: snowflake,
    },
    region: {
        type: snowflake,
    },
    roles: {
        type: snowflake,
    },
    //custom guild emojis
    emojis: {
        type: snowflake,
    },
    max_members: {
        type: snowflake,
    },
    banner: {
        type: snowflake,
    },










});