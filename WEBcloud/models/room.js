import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const RoomSchema = new schema({
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^[a-z0-9_-]+$/i
    },
    archived: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
		type: ObjectId,
		ref: 'User',
        required: true
    },
    participants: [{ // We can have an array per role
		type: ObjectId,
		ref: 'User'
	}],
	messages: [{
		type: ObjectId,
		ref: 'Message'
	}],
    created: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    private: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: false//only for password-protected room
    },
    member_count: {
        type: Number,
    },
    member: {
        type: String,
    },
    permissions: {
        type: String,
    }
});






export default mongoose.model('room', RoomSchema);
