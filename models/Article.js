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
        default: "",
    },
    image: {
        type: String,
        required: true
    },
    file: {
        type: String,
        default: "",
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Article", articleSchema);