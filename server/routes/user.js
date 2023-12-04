const express = require("express");
const User = require("../models/User");
const userRouter = express.Router();

require("../connect");

userRouter.get("/user", (req, res) => res.send("Welcome to the user page!"));

module.exports = userRouter;
