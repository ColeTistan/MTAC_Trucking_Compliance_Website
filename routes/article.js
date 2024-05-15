const express = require("express");
const articleRouter = express.Router();
const baseUrl = "/news";
const { uploadFormFields } = require("../services/articleServices");
const {
  getArticleById,
  getFeaturedArticles,
  addArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
  getInsightArticles,
  getDashboardArticles, 
} = require("../controllers/articleController");

articleRouter.get(`/`, getFeaturedArticles);
articleRouter.get(`${baseUrl}/update/:id`, getArticleById);
articleRouter.get(`${baseUrl}/create`, addArticle);
articleRouter.get(`/insight`, getInsightArticles);
articleRouter.get(`/dashboard`, getDashboardArticles);
articleRouter.post(`${baseUrl}/`, uploadFormFields, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, uploadFormFields, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, deleteArticleById);
module.exports = articleRouter;
