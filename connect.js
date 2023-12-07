const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected successfully...")
}).catch((error) => {
    console.error(`failed to connect to server ${error}`);
});