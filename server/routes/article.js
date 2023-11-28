const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/Article");
const baseURL = "/api"
const router = express.Router();

require("../connect");

router.get(["/", `${baseURL}/`], (req, res) => res.send("Welcome to the MTAC Trucking Compliance Database!"));

module.exports = router;