const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 16,
        max: 48,
        unique: true
    },
    email: {
        type: String,
        require: true,
        min: 16,
        max: 48,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 16
    }
});

module.exports = mongoose.model('User', userSchema);