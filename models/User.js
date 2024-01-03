const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      min: 16,
      max: 255,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
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
  }
);

userSchema.pre("save", (next) => {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

// export user schema
module.exports = mongoose.model("User", userSchema);
