const express = require("express");
const viewsRouter = express.Router();

global.isHomePage = true;

viewsRouter.get("/", (req, res) => {
  return res.render("index");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = viewsRouter;
