// import npm modules and user controller functions.
const express = require("express");
const authRouter = express.Router();
const { signUpUser, loginUser, } = require("../controllers/authController");

authRouter.post("/login", loginUser);
authRouter.post("/signup", signUpUser);

module.exports = authRouter;
