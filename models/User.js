const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  // TODO - Replace current fields with Google OAuth fields
  // to allow google login for employees
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { 
    collection: "users"
  }
);

// export user schema
const User = mongoose.model("User", userSchema);
module.exports = User;
