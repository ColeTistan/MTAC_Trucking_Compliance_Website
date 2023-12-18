const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: false,
        min: 16,
        max: 255,
        unique: true
    },
    email: {
        type: String,
        require: true,
        min: 16,
        max: 255,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);