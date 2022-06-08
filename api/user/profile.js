import Router from "express"
import bcrypt from "bcrypt"
import express from 'express'

import User from "../../models/User.js"

var router = express.Router()

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/getusers", async (req, res) => {
    try {
      User.find({ searchfield: value });
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});
