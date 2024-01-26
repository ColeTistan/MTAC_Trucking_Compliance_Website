const express = require("express");
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  let token = req.cookies.token;
  console.log(token);
  return res.render("index", { token });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

viewsRouter.get("/article", (req, res) => {
  res.render("article");
});

viewsRouter.get("/news", (req, res) => {
  res.render("news");
});

module.exports = viewsRouter;
