const express = require("express");
const articleRouter = express.Router();
const baseUrl = "/news";
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");

require("../connect");

articleRouter.get(`${baseUrl}/`, getArticles);
articleRouter.get(`${baseUrl}/:id`, getArticleById);
articleRouter.post(`${baseUrl}/`, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, deleteArticleById);
module.exports = articleRouter;
