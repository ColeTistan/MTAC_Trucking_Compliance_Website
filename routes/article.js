const express = require("express");
const Article = require("../models/Article");
const articleRouter = express.Router();

require("../connect");

articleRouter.get("/article", (req, res) => res.send("Welcome to the article page!"));

module.exports = articleRouter;