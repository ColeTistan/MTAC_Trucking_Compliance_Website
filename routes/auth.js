const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const User = require("../models/User");

// Configure connection to mongoDB database
require("../connect");

// initialize passport local strategy
passport.use(User.createStrategy());

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

authRouter.post("/register", async (req, res) => {
  try {
    const newUser = await User.register(
      {
        username: req.body.username,
      },
      req.body.password
    );
    if (newUser) {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  } catch (err) {
    res.send(err);
  }
});

authRouter.post("/login", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // login method from Passport library will check if user credentials are correct or not.
  req.login(user, (err) => {
      passport.authenticate("local", (req, res, next) => {
        res.redirect("/articles");
      });
  });
});

authRouter.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = authRouter;
