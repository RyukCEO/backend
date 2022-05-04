//dependencies
import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import request from 'request';
import cookie from 'cookie';
import { MemoryStore } from 'express-session';
import cookiejar from 'cookiejar';
import jsTokens from 'js-tokens';
import toArrayBuffer from 'to-arraybuffer';
import Promise from 'promise';
import WebSocketfaye from 'faye-websocket';
import Extensions from 'websocket-extensions';
import WebSocket from 'ws';
//import Signal from libsignal-service';
import forge from 'node-forge';
import fs from 'fs-extra'
import fetch from 'node-fetch';
import cassandra from 'cassandra-driver';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import websocket from 'websocket-driver';
import buffer from "buffer";
import mustache from "mustache";
import HttpProxyAgent from 'http-proxy-agent';
import tmp from 'tmp';
import { v4 as uuidv4 } from 'uuid';
import filesize from 'filesize';
import { createStore } from 'redux'
import swaggerUi from 'swagger-ui-express';
import('newrelic');




// api route
import authroutes from './api/auth.js';
import userroutes from './api/user/user.js';
import mediapostroutes from './api/mediapost.js';
import { response } from 'express';
import User from './models/User.js';
import 'dotenv/config'


const app = express()

//mongoose mongodb database connection
mongoose.connect('mongodb+srv://ryuk:jz1234@cluster0.id76b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err))


//dotenv.config({ path: "./"})
/*http = require('http');
var server = http.createServer(); l
*/ 


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
/* fix unsuported node version
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);
*/

/* sentry */
Sentry.init({
  dsn: "https://2f8e91edbc364356a287d40f6d08f557@o1158419.ingest.sentry.io/6241559",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});


app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.get("/debug-sentry", function (req, res) {
  throw new Error("My first Sentry error!");
  res.errorHandler
});

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

app.use(
  Sentry.Handlers.requestHandler({
    serverName: false,
    user: ["email"],
  })
);



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

//api
app.use('/api/auth', authroutes)
app.use('/api/user', userroutes)
app.use('/api/mediapost', mediapostroutes)




export default app;

const port = process.env.port || 8080;
app.listen(port);