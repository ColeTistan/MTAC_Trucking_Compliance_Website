// import npm modules and user controller functions.
const express = require("express");
const authRouter = express.Router();
const {
  signUpUser,
  loginUser,
  getUserData,
  registerUser,
} = require("../controllers/authController");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configure passport middleware and google passport strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      registerUser(profile, done);
    }
  )
);

// redirect to login failure if auth fails
const loginFailure = (req, res) => {
  res.send("Error: username or password is incorrect...");
};

authRouter.post("/login", loginUser);
authRouter.post("/signup", signUpUser);

// Google auth routes with middleware and controller method(s)
authRouter.get("/login-failure", loginFailure);

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/",
  })
);

// Persist user data after
// authentication was successful.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from login session
passport.deserializeUser((id, done) => {
  getUserData(id, done);
});

module.exports = authRouter;
