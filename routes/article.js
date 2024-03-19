const express = require("express");
const articleRouter = express.Router();
const baseUrl = "/news";
const { uploadFormFields } = require("../services/articleServices");
const {
  getArticles,
  getArticleById,
  getFeaturedArticles,
  addArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");

articleRouter.get(`/`, getFeaturedArticles);
articleRouter.get(`${baseUrl}/update/:id`, getArticleById);
articleRouter.get(`${baseUrl}/create`, addArticle);
articleRouter.get(`/insights`, getArticles);
articleRouter.post(`${baseUrl}/`, uploadFormFields, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, deleteArticleById);
module.exports = articleRouter;
