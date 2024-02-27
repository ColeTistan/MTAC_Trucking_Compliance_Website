const express = require("express");
const articleRouter = express.Router();
const baseUrl = "/news";
const {
  getArticles,
  getArticleById,
  addArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");

require("../connect");

articleRouter.get(`${baseUrl}/`, getArticles);
articleRouter.get(`${baseUrl}/update/:id`, getArticleById);
articleRouter.get(`${baseUrl}/create`, addArticle);
articleRouter.post(`${baseUrl}/`, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, deleteArticleById);
module.exports = articleRouter;
