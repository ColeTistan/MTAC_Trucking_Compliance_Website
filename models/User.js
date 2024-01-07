const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 16,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 16,
      max: 255,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// export user schema
module.exports = mongoose.model("User", userSchema);
