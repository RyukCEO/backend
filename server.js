//dependencies
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { getRedisInstance, redisInstanceExists } from "./redis/instance.ts";
import redisSession from './middlewares/redisSession.ts'
import { RedisClient, ClientOpts, createClient  } from 'redis';
import { getIOInstance } from "./socket/instance.ts";
//import Signal from libsignal-service';
import cassandra from 'cassandra-driver';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import buffer from "buffer";
import HttpProxyAgent from 'http-proxy-agent';
import tmp from 'tmp';
import { v4 as uuidv4 } from 'uuid';
import filesize from 'filesize';
import { createStore } from 'redux'
import ('newrelic');

const app = express()
process.env.JWT_HEADER = "eyJhbGciOiJIUzI1NiJ9.";



// api route
/*import authroutes from './api/auth.js';
import userroutes from './api/user/user.js';
import mediapostroutes from './api/mediapost.js';
app.use('/api/auth', authroutes)
app.use('/api/user', userroutes)
app.use('/api/mediapost', mediapostroutes)
*/
// insta routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use('/api', require('./routes/api'));
app.use(realIP);
app.use(cors);
app.use(function(req, res, next){
  req.io = io;
  next();
})
app.use(redisSession);

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});


import { response } from 'express';
import User from './models/User.js';
import 'dotenv/config'
dotenv.config();





//mongoose mongodb database connection
mongoose.connect('mongodb+srv://ryuk:jz1234@cluster0.id76b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
.then((result) => console.log('connected to db'))
connectRedis()
.catch((err) => console.log(err))

function connectRedis() {
  Log.info("Connecting to Redis...")
  if (redisInstanceExists()) return;
  const client = getRedisInstance({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
    port: parseInt(process.env.REDIS_PORT)
  });
  if (!client) return;
  client.on("ready", () => {
    Log.info("Connected!")
    client.flushall();
    startServer();
  });
  client.on("error", err => {
    throw err;
  })
}




app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = require("./config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");



const client = new MongoClient('mongodb+srv://ryuk:jz1234@cluster0.id76b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(session({
    resave: false,
    saveUninitialized: true,
    name: 'sid',
    secret: 'some secret',
    store: MongoStore.create({ 
    mongoUrl: 'mongodb+srv://ryuk:jz1234@sessions.mnty4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' }),
    cookie: {
        maxage: 99 * 99,
        samesite: false,
        secure: false,
        httpOnly: true
    }
}))

//remove in production, remove cookie everytime
app.use((req, res, next) => {
  if (req.cookies.sid && !req.session.user) {
    res.clearCookie("sid");
  }
  next();
});




export default app;

const port = process.env.port || 8080;
app.listen(port);