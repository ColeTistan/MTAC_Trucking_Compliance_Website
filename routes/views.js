const express = require("express");
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  return res.render("index", { token: req.cookies.token });
});

viewsRouter.get("/about", (req, res) => {
  res.render("about", { token: req.cookies.token });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: req.cookies.token });
});

viewsRouter.get("/links", (req, res) => {
  res.render("links", { token: req.cookies.token });
});

viewsRouter.get("/news", (req, res) => {
  res.render("articles", { token: req.cookies.token });
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: req.cookies.token });
});

viewsRouter.get("/article", (req, res) => {
  res.render("addArticle", { token: req.cookies.token });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

module.exports = viewsRouter;
