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
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^[\w][\w\-\.]*[\w]$/i
  },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      type:String,
      trim: true,
    },
    profilepicture:{
        type:String,
        trim: true,
        default:""
    },
    followers: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    },],
  /*{
        type: Array,
        default:[]
    },*/
    following:[
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  /*  {
        type: Array,
        default:[]
    }, */
  
    friends:{
        type: Array,
    },
    posts:{
        type: Array,
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
  //multifactorauth
  mfa: {
    type: Boolean,
},

  banner: {
    type: String,
  },

  language: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  usertype: {
    type: Number,
  },

  rooms: {
  type: String,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
  },
  
})
export default mongoose.model('User', UserSchema);
