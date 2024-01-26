const mongoose = require("mongoose");
const Article = require("../models/Article");

require("../connect");

// GET - Retrieve all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    return articles;
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
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - create a new article
const createArticle = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;
  console.log(title, description, url);
  try {
    if (title == "" || description == "" || url == "") {
      res.status(400).json({
        message: "Error: all fields are required and must be entered...",
      });
    }
    const newArticle = Article({
      title: title,
      description: description,
      url: url,
    });
    await newArticle.save();
    res.status(201).json({
      message: "Successfully added new article",
      data: newArticle,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      articleData
    );
    res
      .status(201)
      .json({ message: "Successfully updated article", data: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete an article by ID
const deleteArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.deleteOne({ _id: articleId });
    res
      .status(201)
      .json({ message: "Successfully deleted article", data: article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
};
