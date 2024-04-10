const {
  validateEmployeeUser,
} = require("../services/authService");

// Import User model and Google Auth Strategy
const User = require("../models/User");

// Retrieve user data
const getUserData = async (id, done) => {
  User.findById(id)
    .then((user) => {
      let isEmployee = validateEmployeeUser(user);
      if (!isEmployee) done(null, false);
      else done(null, user);
    })
    .catch(done);
};

// Create new user if not registered
const registerUser = async (profile, done) => {
  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    profileImage: profile.photos[0].value,
    email: profile.emails[0].value,
  };

  try {
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      done(null, user);
    } else {
      if (!validateEmployeeUser(newUser)) {
        done(null, false);
      } else {
        // create user if user email has employee address
        user = await User.create(newUser);
        // validate user email is an employee address
        done(null, user);
      }
    }
  } catch (error) {
    done(error, null);
  }
};

const logOutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.send("Error: user logout failed...");
    } else {
      res.redirect("/");
    }
  });
};

module.exports = {
  getUserData,
  registerUser,
  logOutUser,
};
