const express = require("express");
const viewsRouter = express.Router();
let { linkData, testimonialData } = require("../public/assets/data");

viewsRouter.get("/", (req, res) => {
  return res.render("index", {
    token: req.cookies.token,
    testimonies: testimonialData,
  });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: req.cookies.token });
});

viewsRouter.get("/links", (req, res) => {
  res.render("links", {
    token: req.cookies.token,
    links: linkData,
  });
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
