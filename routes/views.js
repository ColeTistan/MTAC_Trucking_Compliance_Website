const express = require('express');
const viewsRouter = express.Router();

require("../connect");

viewsRouter.get('', (req, res) => {
    res.render('index', { text: 'This is EJS'})
})

viewsRouter.get('/about', (req, res) => {
    res.render('about', { text: 'About Page'})
})

module.exports = viewsRouter;