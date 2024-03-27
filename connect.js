const dotenv = require("dotenv");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected successfully...");
    } catch (err) {
        console.error(`failed to connect to server: ${err}`);
    }
}

module.exports = connectDB;