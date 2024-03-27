const express = require("express");
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  res.render("index", { token: req.cookies.token });
});

viewsRouter.get("/about", (req, res) => {
  res.render("about", { token: req.cookies.token });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: req.cookies.token });
});

viewsRouter.get("/insight", (req, res) => {
  res.render("insight", { token: req.cookies.token });
});

viewsRouter.get("/news", (req, res) => {
  res.render("news", { token: req.cookies.token });
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: req.cookies.token });
});

// viewsRouter.get("/login", (req, res) => {
//   res.render("login", { token: req.cookies.token });
// });

viewsRouter.get("*", (req, res) => {
  res.render("notFound");
});

module.exports = viewsRouter;
