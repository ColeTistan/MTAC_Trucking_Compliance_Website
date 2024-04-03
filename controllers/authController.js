const bcrypt = require("bcrypt");
const { verifyUserLogin } = require("../services/authService");

// Import User model and Google Auth Strategy
const User = require("../models/User");

// set constants for authentication
const salt = 10;

// Sign up new user and hash password set
const signUpUser = async (req, res) => {
  // getting our data from frontend
  const { email, password: plainTextPassword } = req.body;

  // encrypting our password to store in database
  const password = await bcrypt.hash(plainTextPassword, salt);
  try {
    // storing our user data into database
    const response = await User.create({
      email,
      password,
    });
    console.log(response);
    return res.redirect("/");
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error.code === 11000) {
      return res.send({ status: "error", error: "email already exists" });
    }
    throw error;
  }
};

// login user and verify user with json web token
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // we made a function to verify our user login
  const response = await verifyUserLogin(email, password);
  if (response.status === "ok") {
    // storing our JWT web token as a cookie in our browser
    res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
    res.redirect("/");
  } else {
    res.json(response);
  }
};

const getUserData = (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
};

const registerUser = async (profile, done) => {
  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    profileImage: profile.photos[0].value,
  };

  console.log(newUser, profile.emails[0].value.split("@"));

  try {
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      done(null, user);
    } else {
      user = await User.create(newUser);
      done(null, user);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUserData,
  registerUser,
};
