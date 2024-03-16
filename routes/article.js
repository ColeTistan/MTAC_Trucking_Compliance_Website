const express = require("express");
const articleRouter = express.Router();
const baseUrl = "/news";
const { upload } = require("../services/articleServices");
const {
  getArticles,
  getArticleById,
  addArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");

articleRouter.get(`${baseUrl}/`, getArticles);
articleRouter.get(`${baseUrl}/update/:id`, getArticleById);
articleRouter.get(`${baseUrl}/create`, addArticle);
articleRouter.post(`${baseUrl}/`, upload, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, deleteArticleById);
module.exports = articleRouter;
