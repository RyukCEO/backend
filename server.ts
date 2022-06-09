//dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import http from "http";
import mongoose from 'mongoose';
// middlewares
import { getRedisInstance, redisInstanceExists } from "./redis/instance";
import { getIOInstance } from "./socket/instance";
import redisSession from './middlewares/redisSession'
import realIP from "./middlewares/realIP";
import cors from "./middlewares/cors";
import ('newrelic');

const app = express()
app.disable('x-powered-by');

process.env.JWT_HEADER = "eyJhbGciOiJIUzI1NiJ9.";

const server = new http.Server(app);
const io = getIOInstance(server);


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
app.use(bodyParser.json({limit: '10mb'}));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use('/api', require('./routes/api'));
app.use(realIP);
app.use(cors);




app.use(redisSession);

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});



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
.catch((err) => console.log(err))


  



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.use(cors({
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
*/
const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = require("./config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");






export default app;

const port = process.env.port || 8080;
app.listen(port);