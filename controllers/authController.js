const bcrypt = require("bcrypt");
const User = require("../models/User");
// Configure connection to mongoDB database
require("../connect");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({
    username,
    email,
    password,
  });
  return res.render("index");
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const user = await User.findOne({ email: email, password: password });
  console.log("User", user);
  if (!user) {
    return res.render("login", {
      errorMsg: "Invalid Username or password entered",
    });
  }

  return res.redirect("/");
};

module.exports = {
  registerUser,
  loginUser,
};
