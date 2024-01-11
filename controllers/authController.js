const bcrypt = require("bcrypt");
const User = require("../models/User");
const { verifyUserLogin } = require("../services/authService");

// Configure connection to mongoDB database
require("../connect");

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

module.exports = {
  signUpUser,
  loginUser,
};
