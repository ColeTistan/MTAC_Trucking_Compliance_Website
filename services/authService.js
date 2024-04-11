const dotenv = require("dotenv");

// configure dotenv to allow use of env variables
dotenv.config();


const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) res.redirect("/");
  next();
};

const validateEmployeeUser = (userData) => {
  let emailExtract = userData.email.split("@");
  // if (emailExtract[1] !== 'mtactruckingcompliance.com') return false;

  // Line below is for unit testing purposes.
  if (emailExtract[1] !== 'gmail.com') return false;
  else return true;
};

module.exports = {
  isLoggedIn,
  validateEmployeeUser,
};
