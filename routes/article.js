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
const { isLoggedIn } = require("../services/authService");

articleRouter.get(`/`, getFeaturedArticles);
articleRouter.get(`${baseUrl}/update/:id`, isLoggedIn, getArticleById);
articleRouter.get(`${baseUrl}/create`, isLoggedIn, addArticle);
articleRouter.get(`/insight`, getInsightArticles);
articleRouter.get(`/dashboard`, isLoggedIn, getDashboardArticles);
articleRouter.post(`${baseUrl}/`, isLoggedIn, uploadFormFields, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, isLoggedIn, uploadFormFields, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, isLoggedIn, deleteArticleById);
module.exports = articleRouter;
