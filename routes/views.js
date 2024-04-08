const express = require("express");
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  let user = req.user;
  let token = req.cookies.token;
  console.log(user, token);
  res.render("index", { token: req.cookies.token, user });
});

viewsRouter.get("/about", (req, res) => {
  res.render("about", { token: req.cookies.token, user: req.user });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: req.cookies.token, user: req.user });
});

viewsRouter.get("/insight", (req, res) => {
  res.render("insight", { token: req.cookies.token, user: req.user });
});

viewsRouter.get("/news", (req, res) => {
  res.render("news", { token: req.cookies.token, user: req.user });
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: req.cookies.token, user: req.user });
});

// viewsRouter.get("/login", (req, res) => {
//   res.render("login", { token: req.cookies.token, user: req.user });
// });

viewsRouter.get("*", (req, res) => {
  res.render("notFound");
});

module.exports = viewsRouter;
