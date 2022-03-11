import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const AuditLogschema = new schema ({
    audit_log_entries: {
        type: String,
        required: false,
        trim: true,
      },
    users: {
        type: String,
        required: false,
        trim: true,
      },
    uid: {
        type: String,
        required: false,
        trim: true,
      },
    

})

const AuditLogEntryschema = new schema ({
    //id of the affected entity (webhook, user, role, etc.)
    target_id: {
        type: String,
        required: false,
        trim: true,
    },
    //changes made to the target_id
    changes: {
        type: String,
        required: false,
        trim: true,
    },
    //the user who made the changes
    user_id: {
        type: String,
        required: false,
        trim: true,
    },
    //id of the entry
    id: {
        type: String,
        required: false,
        trim: true,
    },
    //type of action that occurred
    action_type: {
        type: String,
        required: false,
        trim: true,
    },
    //the reason for the change
    reason: {
        type: String,
    },  

})

const AuditLogEventschema = new schema ({

    GUILD_UPDATE: {
        value: 1,
    },
    CHANNEL_CREATE: {
        value: 2,
    },
    CHANNEL_UPDATE: {
        value: 3,
    },
    CHANNEL_DELETE: {
        value: 4,
    },
    CHANNEL_OVERWRITE_CREATE: {
        value: 5,
    },
    CHANNEL_OVERWRITE_UPDATE: {
        value: 6,
    },
    CHANNEL_OVERWRITE_DELETE: {
        value: 7,
    },
    MEMBER_KICK: {
        value: 8,
    },
    MEMBER_PRUNE: {
        value: 9,
    },
    MEMBER_BAN_ADD: {
        value: 10,
    },
    MEMBER_BAN_REMOVE: {
        value: 11,
    },
    MEMBER_UPDATE: {
        value: 12,
    },
    MEMBER_ROLE_UPDATE: {
        value: 13,
    },
    MEMBER_MOVE: {
        value: 14,
    },
    MEMBER_DISCONNECT: {
        value: 15,
    },
    BOT_ADD: {
        value: 16,
    },
    ROLE_CREATE: {
        value: 17,
    },
    ROLE_UPDATE: {
        value: 18,
    },
    ROLE_DELETE: {
        value: 19,
    },
    INVITE_CREATE: {
        value: 20,
    },
    INVITE_UPDATE: {
        value: 21,
    },
    INVITE_DELETE: {
        value: 22,
    },
    WEBHOOK_CREATE: {
        value: 23,
    },
    WEBHOOK_UPDATE: {
        value: 24,
    },    
    WEBHOOK_DELETE: {
        value: 25,
    },
    EMOJI_CREATE: {
        value: 26,
    },
    EMOJI_UPDATE: {
        value: 27,
    },
    EMOJI_DELETE: {
        value: 28,
    },
    MESSAGE_DELETE: {
        value: 29,
    },
    MESSAGE_BULK_DELETE: {
        value: 30,
    },
    MESSAGE_PIN: {
        value: 31,
    },
    MESSAGE_UNPIN: {
        value: 32,
    },
    INTEGRATION_CREATE: {
        value: 33,
    },
    INTEGRATION_UPDATE: {
        value: 34,
    },
    INTEGRATION_DELETE: {
        value: 35,
    },
    STAGE_INSTANCE_CREATE: {
        value: 36,
    },
    STAGE_INSTANCE_UPDATE: {
        value: 37,
    },
    STAGE_INSTANCE_DELETE: {
        value: 38,
    },
    STICKER_CREATE: {
        value: 39,
    },
    STICKER_UPDATE: {
        value: 40,
    },
    STICKER_DELETE: {
        value: 41,
    },
    GUILD_SCHEDULED_EVENT_CREATE: {
        value: 42,
    },
    GUILD_SCHEDULED_EVENT_UPDATE: {
        value: 43,
    },
    GUILD_SCHEDULED_EVENT_DELETE: {
        value: 44,
    },
    THREAD_CREATE: {
        value: 45,
    },
    THREAD_UPDATE: {
        value: 46,
    },
    THREAD_DELETE: {
        value: 47,
    },
});