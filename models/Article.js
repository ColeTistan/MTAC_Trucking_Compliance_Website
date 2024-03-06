const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    // TODO - modify current model to allow internal articles
    // to be added as a file upload.
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