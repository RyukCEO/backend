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


import authroutes from './api/auth.js';
import userroutes from './api/user.js';
import mediapostroutes from './api/mediapost.js';
import { response } from 'express';
import User from './models/User.js';
const app = express()
import 'dotenv/config'



//mongoose mongodb database connection
mongoose.connect('mongodb+srv://ryuk:jz1234@cluster0.id76b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err))


import websocket from 'websocket-driver';


//dotenv.config({ path: "./"})
/*http = require('http');
var server = http.createServer(); l
*/ 


app.use(express.json());
app.use(cookieParser());


const client = new MongoClient('mongodb+srv://ryuk:jz1234@cluster0.id76b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));


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


//remove in production 
app.use((req, res, next) => {
  if (req.cookies.sid && !req.session.user) {
    res.clearCookie("sid");
  }
  next();
});


app.get("/profile/:userid",function(req,res,next){
  var id = req.params.userid;

  var getUserDetails= userModel.find({_id:id},{'email':1,'profileImage':1});

  getUserDetails.exec()
  .then(data=>{
      res.status(200).json({
          message:"OK",
          results:data
      });
  })
  .catch(err=>{
      res.json(err);
  })

  res.render('', {
    username: username,
    avatar:  avatar
  })
});


app.use('/api/auth', authroutes)
app.use('/api/user', userroutes)
app.use('/api/mediapost', mediapostroutes)



app.get('/setting', (req,res) => {
  res.sendFile(__dirname + '/public/setting/setting.html')
})

app.get('/logedin', (req,res) => {
  if (!req.session || !req.sessionID || !req.session.user || !req.cookies.sid) {
      const err = new Error("unatuh");
      err.statusCode = 401;
      res.redirect('/login')
  } else {
   res.render("logedin",{username:User.username}) 
  };

console.log(req.sessionID)
  


});



app.get("/login", (req, res) => {
/*
  if (req.session || req.session.cookie) {
    res.redirect('/logedin')
  } else {
    res.sendFile(__dirname + '/public/login/login.html')
}
*/  
    console.log(req.sessionID)
    res.render("login") 
});


app.get("/signup", (req,res) => {
  res.render("signup") 
});


app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.sid) {
    res.clearCookie("sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});


app.post('/logout', (req,res)  => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/logedin')
    } else {
    if (req.session.user && req.cookies.sid) {
    res.clearCookie("sid");
    res.redirect("/login");
    } else {
    res.redirect("/login");
      }
    }
  })
})


//message protocal

/*
app.post('/send', receiveKeys);
app.post('/get', sendKeys);
app.post('/send/message', storeIncomingMessage);
app.post('/get/message', forwardMessageToClient);
*/
//receiveKeys - get keys (initial key packet and preKeys) from client. 
//Initial/Registration Packet:
/*
request.body = {
	type: 'init',
	deviceId: int,
	registrationId: int,
	identityKey: str,
	signedPreKey: {
		id: int,
		key: str,
		signature: str
}, preKeys: [
  {
    id: int,
    key: str
  },
  {
    id: int,
    key: str
  },
  ]
}

//Pre Keys Packet:
request.body = {
	type: 'pre-keys',
	deviceId: int,
	registrationId: int,
	preKeys: [
		{
			id: int,
			key: str
		},
		{
			id: int,
			key: str
		},
	]
}

var storageMap = {};
var messageStorageMap = {};

function receiveKeys(req, res){
	let reqObj = req.body;
	//console.log(req.body);
	let storageKey = reqObj.registrationId.toString() + reqObj.deviceId.toString();
	if(storageMap[storageKey]){
		res.json({err: 'Init packet for this user already exists'});
	} else {
		storageMap[storageKey] = reqObj;
		res.json({msg: 'Initial packet successfully saved'});
	}
	console.log('\n');
	console.log('storageMap~~~~~~~');
	console.log(storageMap);
}

function sendKeys(req, res){
	let reqObj = req.body;
	let storageKey = reqObj.registrationId.toString() + reqObj.deviceId.toString();
	let responseObject;
	if(storageMap[storageKey]){ 
		if(storageMap[storageKey].preKeys.length !== 0){
			responseObject = JSON.parse(JSON.stringify(storageMap[storageKey]));
			responseObject.preKey = responseObject.preKeys[responseObject.preKeys.length - 1];
			storageMap[storageKey].preKeys.pop();
		} else {
			responseObject = {err: 'Out of preKeys for this user'}
		}
	} else {
		responseObject = {
			err: 'Keys for ' + storageKey + ' user does not exist'
		}
	}
	console.log(responseObject);
	res.json(responseObject);
}

function storeIncomingMessage(req, res) {
	let reqObj = req.body;
	let messageStorageKey = reqObj.messageTo.registrationId.toString() + reqObj.messageTo.deviceId.toString() + reqObj.messageFrom.registrationId.toString() + reqObj.messageFrom.deviceId.toString();
	if(messageStorageMap[messageStorageKey]) {
		res.json({err: 'Can only deal with one message'});
	} else {
		messageStorageMap[messageStorageKey] = reqObj;
		res.json({msg: 'Message successfully saved'});
	}
	console.log('\n');
	console.log('~~~~~~~messageStorageMap~~~~~~~');
	console.log(messageStorageMap);
}

function forwardMessageToClient(req, res) {
	let reqObj = req.body;
	let messageStorageKey = reqObj.messageTo.registrationId.toString() + reqObj.messageTo.deviceId.toString() + reqObj.messageFromUniqueId;
	let responseObject;
	if(messageStorageMap[messageStorageKey]){
		if(storageMap[reqObj.messageFromUniqueId]){
			responseObject = messageStorageMap[messageStorageKey];
			responseObject.messageFrom = {
				registrationId: storageMap[reqObj.messageFromUniqueId].registrationId,
				deviceId: storageMap[reqObj.messageFromUniqueId].deviceId
			};
		} else {
			{ err: 'Client: ' + reqObj.messageFromUniqueId + ' is not registered on this server.' }
		}
	} else {
		responseObject = { err: 'Message from: ' + reqObj.messageFromUniqueId + ' to: ' + reqObj.messageTo.registrationId.toString() + reqObj.messageTo.deviceId.toString() + ' does not exist' };
	}
	res.json(responseObject);
}
*/


export default app;

const port = process.env.port || 8080;
app.listen(port);