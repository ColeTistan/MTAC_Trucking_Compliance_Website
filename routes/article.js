const express = require("express");
const Article = require("../models/Article");
const articleRouter = express.Router();
const baseUrl = "/articles";
const urlById = `${baseUrl}/:id`;
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");

require("../connect");

articleRouter.get(`${baseUrl}/`, getArticles);
articleRouter.get(urlById, getArticleById);
articleRouter.post(`${baseUrl}/`, createArticle);
articleRouter.put(urlById, updateArticleById);
articleRouter.delete(urlById, deleteArticleById);
module.exports = articleRouter;
