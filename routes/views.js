const express = require("express");
const viewsRouter = express.Router();

require("../connect");

viewsRouter.get("/", (req, res) => {
    res.render("index");
});

viewsRouter.get("/login", (req, res) => {
    res.render("login");
});

viewsRouter.get("/authenticate", (req, res) => {
    res.render("auth");
})

module.exports = viewsRouter;