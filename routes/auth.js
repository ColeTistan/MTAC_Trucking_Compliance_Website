const express = require("express");
const stytch = require("stytch");
const User = require("../models/User");
const authRouter = express.Router();

// Configure connection to mongoDB database
// and stytch authentication service
require("../connect");

const client = new stytch.Client({
    project_id: process.env.PROJECT_ID,
    secret: process.env.SECRET,
    env: stytch.envs.test
});

// POST - Register a new user or login as an existing user.
authRouter.post("/login", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const params = {
            email: userEmail,
            login_magic_link_url: "http://localhost:3000/authenticate",
            signup_magic_link_url: "http://localhost:3000/authenticate"
        }

        const response = await client.magicLinks.email.loginOrCreate(params);

        // return json response if successful
        res.json(response);
    } catch(err) {
        console.log(err);
    }
});


module.exports = authRouter;