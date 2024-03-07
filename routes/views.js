const express = require("express");
const viewsRouter = express.Router();
let { linkData, testimonialData } = require("../public/assets/data");

viewsRouter.get("/", (req, res) => {
  return res.render("index", {
    token: req.cookies.token,
    testimonies: testimonialData,
  });
});

viewsRouter.get("/about", (req, res) => {
  res.render("about", { token: req.cookies.token });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: req.cookies.token, links: linkData });
});

viewsRouter.get("/insights", (req, res) => {
  res.render("insight", { token: req.cookies.token, links: linkData });
});

viewsRouter.get("/news", (req, res) => {
  res.render("news", { token: req.cookies.token });
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: req.cookies.token });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login", { token: req.cookies.token });
});

viewsRouter.get("*", (req, res) => {
  res.render("notFound");
});

module.exports = viewsRouter;
