const express = require("express");
const viewsRouter = express.Router();

require("../connect");

global.isHomePage = true;

viewsRouter.get("/", (req, res) => {
  return res.render("index");
});

viewsRouter.get("/login", (req, res) => {
  // Check if page is home page
  isHomePage = false;
  
  return res.render("login");
});

module.exports = viewsRouter;
