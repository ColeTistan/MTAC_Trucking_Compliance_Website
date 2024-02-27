const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        required: false,
        max: 255
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Article", articleSchema);