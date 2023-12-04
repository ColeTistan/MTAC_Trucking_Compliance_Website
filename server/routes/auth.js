const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authRouter = express.Router();

require("../connect");

authRouter.get("/auth", (req, res) => res.send("Welcome to the user authentication page!"));

// POST - Register a new user
authRouter.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.send(500).json(err);
    }
});

// POST - login user with username and password
authRouter.post("/login", async (req, res) => {
    try {
        // Check if user exists. If not found, throw 400 status code
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("Error: User not found...");

        // If user does exist, check if password entered matches the password encrypted.
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Error: Incorrect password entered...");

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = authRouter;