const express = require("express");
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  res.render("/");
});

viewsRouter.get("/about", (req, res) => {
  res.render("about");
});

viewsRouter.get("/service", (req, res) => {
  res.render("service");
});

viewsRouter.get("/insight", (req, res) => {
  res.render("insight");
});

viewsRouter.get("/news", (req, res) => {
  res.render("news");
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact");
});

viewsRouter.get("/dashboard", (req, res) => {
  res.render("dashboard");
})

viewsRouter.get("*", (req, res) => {
  res.render("notFound");
});

module.exports = viewsRouter;
