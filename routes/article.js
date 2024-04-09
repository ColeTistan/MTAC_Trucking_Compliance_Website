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
const { isLoggedIn } = require("../services/authService");

articleRouter.get(`/`, getFeaturedArticles);
articleRouter.get(`${baseUrl}/update/:id`, isLoggedIn, getArticleById);
articleRouter.get(`${baseUrl}/create`, isLoggedIn, addArticle);
articleRouter.get(`/insight`, getArticles);
articleRouter.post(`${baseUrl}/`, isLoggedIn, uploadFormFields, createArticle);
articleRouter.put(`${baseUrl}/update/:id`, isLoggedIn, updateArticleById);
articleRouter.delete(`${baseUrl}/delete/:id`, isLoggedIn, deleteArticleById);
module.exports = articleRouter;
