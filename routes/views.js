const express = require("express");
const viewsRouter = express.Router();
let linkData = require("../public/assets/linkData");

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
  res.render("links", { token: req.cookies.token, links: linkData });
});

viewsRouter.get("/news", (req, res) => {
  res.render("news", { token: req.cookies.token });
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: req.cookies.token });
});

viewsRouter.get("/article", (req, res) => {
  res.render("addArticle", { token: req.cookies.token });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login", { token: req.cookies.token });
});

module.exports = viewsRouter;
