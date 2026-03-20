const express = require("express");
const { testimonialData, linkData } = require("../public/assets/data");
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  res.render("/", { token: res.locals.token });
});

viewsRouter.get("/about", (req, res) => {
  res.render("about", {
    token: res.locals.token,
    testimonials: testimonialData
  });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: res.locals.token });
});

viewsRouter.get("/news/create", (req, res) => {
  res.render("addArticle", { token: res.locals.token });
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: res.locals.token });
});

viewsRouter.get("/dashboard", (req, res) => {
  res.render("dashboard", { token: res.locals.token });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login", { token: res.locals.token });
});

viewsRouter.get("*", (req, res) => {
  res.render("notFound");
});

module.exports = viewsRouter;
