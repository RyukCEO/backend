import Router from "express";
import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

var router = express.Router()

import User from "../models/mediapost.js";




router.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.sid) {
      res.clearCookie("sid");
      res.redirect("/login");
    } else {
      res.redirect("/login");
    }
  });
  
  
  router.post('/logout', (req,res)  => {
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