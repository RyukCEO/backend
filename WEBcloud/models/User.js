import mongoose from "mongoose"

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new schema({
  uid: {
    type: String,
    required: false,
    trim: true,
  },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phonenumber: {
      type: String,
      required: false
    },
    desc:{
      type:String
    },
    profilepicture:{
        type:String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    following:{
        type: Array,
        default:[]
    },
    groups:{
      type: Array,
      default:[]
    },
    token: {
      type: String,
      required: false,
      trim: true
  },
  firstName: {
      type: String,
      required: true,
      trim: true
  },
  lastName: {
      type: String,
      required: true,
      trim: true
  },
  username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^[\w][\w\-\.]*[\w]$/i
  },
  displayName: {
      type: String,
      required: true,
      trim: true
  },
  joined: {
      type: Date,
      default: Date.now
  },
  status: {
      type: String,
      trim: true
  },
  rooms: [{
  type: ObjectId,
  ref: 'Room' 
  }],
  });

export default mongoose.model('User', UserSchema);
