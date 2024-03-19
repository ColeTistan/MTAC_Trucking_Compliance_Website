const mongoose = require("mongoose");
const { upload } = require("../services/articleServices");
const Article = require("../models/Article");

// GET - Retrieve all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().exec();
    res.render("insights", { articles: articles, token: req.cookies.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Retrieve article by ID
const getArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    // Checks if ID is valid mongoDB object ID
    // if not, throw 404 Not Found error
    if (!mongoose.isValidObjectId(articleId)) {
      res.status(404).json({
        message: "Error: cannot find article data due to invalid object ID...",
      });
    }

    // Find article by object ID and check if it exists
    // return json object of article if found. Otherwise, throw 404 Not Found error
    const article = await Article.findById(articleId);
    if (article === "") {
      res.status(404).json({ message: "Error: cannot find article data..." });
    }
    res.render("updateArticle", { article: article, token: req.cookies.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedArticles = async (req, res) => {
  try {
    const featuredArticles = await Article.find({ isFeatured: true });
    console.log(featuredArticles);
    res.render("index", {
      featuredArticles: featuredArticles,
      token: req.cookies.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - create a new article
const addArticle = async (req, res) => {
  if (!req.cookies.token) res.render("notFound");
  else res.render("addArticle", { token: req.cookies.token });
};

// POST - create a new article
const createArticle = async (req, res) => {
  // TODO - Add functionality to handle uploading files
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;
  const img = req.files["image"][0].filename;
  const isFeatured = JSON.parse(req.body.isFeatured);
  let file;

  // check for any file(s) uploaded in form
  if (!req.files["file"]) file = undefined;
  else file = req.files["file"][0].filename;

  try {
    if (title == "" || description == "") {
      res.status(400).json({
        message: "Error: all fields are required and must be entered...",
      });
    }
    const newArticle = Article({
      title: title,
      description: description,
      url: url,
      image: img,
      file: file,
      isFeatured: isFeatured ? isFeatured : false,
    });
    await newArticle.save();
    res.redirect("/news");
  } catch (err) {
    console.error(err.message);
  }
};

// PUT - Update an existing article by ID
const updateArticleById = async (req, res) => {
  // get article Id and request data being updated
  const articleId = req.params.id;
  let articleData = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  };

  try {
    if (!mongoose.isValidObjectId(articleId) || articleId === "") {
      res
        .status(404)
        .json({ message: "Error: Object ID not found or invalid..." });
    }
    if (
      articleData.title == "" ||
      articleData.description == "" ||
      articleData.url == ""
    ) {
      res.status(400).json({
        message: "Error: all fields are required and must be entered...",
      });
    }

    // updated article field(s) by given id
    await Article.findByIdAndUpdate(articleId, articleData);
    res.redirect("/news");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete an article by ID
const deleteArticleById = async (req, res) => {
  const articleId = req.params.id;
  console.log(articleId);
  try {
    await Article.deleteOne({ _id: articleId });
    res.redirect("/news");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  getFeaturedArticles,
  addArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
};
