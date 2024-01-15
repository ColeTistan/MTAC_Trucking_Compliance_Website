const express = require("express");
const viewsRouter = express.Router();

global.isHomePage = true;

viewsRouter.get("/", (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  return res.render("index");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

viewsRouter.get("/news", (req, res) => {
  res.render("article");
})

module.exports = viewsRouter;
