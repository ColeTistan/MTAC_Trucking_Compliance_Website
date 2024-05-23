// // import npm modules and user controller functions.
// const express = require("express");
// const bcrypt = require("bcrypt");
// const authRouter = express.Router();
// const {
//   getUserData,
//   registerUser,
//   logOutUser,
//   registerLocalUser,
// } = require("../controllers/authController");

// const passport = require("passport");
// const User = require("../models/User");
// const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// // Configure Google Auth20 passport middleware and google passport strategy
// passport.use(
//   new LocalStrategy((email, password, done) => {
//     // TODO: get / verify user from mongodb Database
//     User.findOne({ email: email }, (error, user) => {
//       if (error) return done(error);
//       if (!user)
//         return done(null, false, { message: "Username doesn't exist..." });
//       bcrypt.compare(password, user.password, (error, res) => {
//         if (error) return done(error);
//         if (res === false)
//           return done(null, false, {
//             message: "Incorrect password entered...",
//           });
//         return done(null, user);
//       });
//     });
//   })
// );

// // Configure Google Auth20 passport middleware and google passport strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       registerUser(profile, done);
//     }
//   )
// );

// // redirect to login failure if auth fails
// const loginFailure = (req, res) => {
//   res.send(
//     "Error: username or password is incorrect (Or maybe you're not an employee)..."
//   );
// };

// // Google auth routes with middleware and controller method(s)
// authRouter.get("/login-failure", loginFailure);

// authRouter.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// authRouter.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/login-failure",
//   }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// authRouter.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// authRouter.get("/logout", logOutUser);
// authRouter.post("/signup", registerLocalUser);

// // Persist user data after
// // authentication was successful.
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Retrieve user data from login session
// passport.deserializeUser((id, done) => {
//   getUserData(id, done);
// });

// module.exports = authRouter;

// import npm modules and user controller functions.
const express = require("express");
const authRouter = express.Router();
const { signUpUser, loginUser, } = require("../controllers/authController");

authRouter.post("/login", loginUser);
authRouter.post("/signup", signUpUser);

module.exports = authRouter;