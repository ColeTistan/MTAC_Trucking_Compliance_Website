const express = require("express");
const viewsRouter = express.Router();

const getToken = (req) => {
  return req.cookies.token;
}

viewsRouter.get("/", (req, res) => {
  return res.render("index", { token: getToken(req) });
});

viewsRouter.get("/about", (req, res) => {
  res.render("about", { token: getToken(req) });
});

viewsRouter.get("/service", (req, res) => {
  res.render("service", { token: getToken(req)});
});

viewsRouter.get("/links", (req, res) => {
  res.render("links", { token: getToken(req)});
});

viewsRouter.get("/news", (req, res) => {
  res.render("news", { token: getToken(req)});
});

viewsRouter.get("/contact", (req, res) => {
  res.render("contact", { token: getToken(req)});
});

viewsRouter.get("/article", (req, res) => {
  res.render("article", { token: getToken(req)});
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

module.exports = viewsRouter;
