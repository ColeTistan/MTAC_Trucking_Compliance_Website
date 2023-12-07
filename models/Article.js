const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    author: {
        type: String,
        required: false,
        max: 225
    },
    title: {
        type: String,
        required: true,
        max: 255,
    },
    sourceTitle: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: false,
        max: 255
    },
    imageUrl: {
        type: String,
        required: false,
        max: 255
    },
    url: {
        type: String,
        required: true
    }, 
    publicationDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Article", articleSchema);