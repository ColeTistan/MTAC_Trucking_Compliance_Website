const mongoose = require("mongoose");
const Article = require("../models/Article");

const getArticleData = async (req, res) => {
  try {
    const articles = await Article.find().exec();
    return articles;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Retrieve all articles for home page
const getInsightArticles = async (req, res) => {
  let articles = await getArticleData();
  res.render("insight", { articles: articles });
};

// GET - Retrieve all articles for dashboard page
const getDashboardArticles = async (req, res) => {
  let dashboardArticles = await getArticleData();
  res.render("dashboard", { articles: dashboardArticles });
};

// GET - Retrieve article by ID
const getArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    // Checks if ID is valid mongoDB object ID
    // if not, throw 404 Not Found error
    if (!mongoose.isValidObjectId(articleId)) {
      res.redirect("/notFound");
    }

    // Find article by object ID and check if it exists
    // return json object of article if found. Otherwise, throw 404 Not Found error
    const article = await Article.findById(articleId);
    if (article === "") {
      res.status(404).json({ message: "Error: cannot find article data..." });
    }
    res.render("updateArticle", { article: article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedArticles = async (req, res) => {
  try {
    const featuredArticles = await Article.find({ isFeatured: true });
    res.render("index", {
      featuredArticles: featuredArticles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - create a new article
const addArticle = async (req, res) => {
  if (!req.user) res.render("notFound");
  else res.render("addArticle", { token: req.cookies.token });
};

// POST - create a new article
const createArticle = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;
  const isFeatured = JSON.parse(
    true ? req.body.isFeatured !== undefined : false
  );
  let file, img;

  // check for any file(s) uploaded in form
  if (req.files["image"] === undefined) {
    res.locals.errorMessage = req.flash("errorMessage", [
      "Error: image field is required and must be entered...",
      "danger",
    ]);
    return res.redirect("/news/create");
  }

  img = req.files["image"][0].filename;

  if (!req.files["file"]) file = undefined;
  else file = req.files["file"][0].filename;

  try {
    if (!url && !file) {
      res.locals.errorMessage = req.flash("errorMessage", [
        "Error: a URL or PDF file must be filled in...",
        "danger",
      ]);
      return res.redirect("/news/create");
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
    req.flash("successMessage", ["Added new article successfully!", "success"]);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err.message);
  }
};

// PUT - Update an existing article by ID
const updateArticleById = async (req, res) => {
  // get article Id and request data being updated
  // with validation
  const articleId = req.params.id;

  if (!req.files["image"]) {
    // Check if image was entered
    res.locals.errorMessage = req.flash("errorMessage", [
      "Error: image field is required and must be entered...",
      "danger",
    ]);
    return res.redirect(`/news/update/${articleId}`);
  } else image = req.files["image"][0].filename;

  if (!req.files["file"]) {
    // check if user has entered a PDF file
    file = undefined;
  } else {
    if (req.body.url !== "") {
      // checks if both url and PDF files are inputted
      res.locals.errorMessage = req.flash("errorMessage", [
        "Error: Either a url or PDF file can be entered...",
        "danger",
      ]);
      return res.redirect(`/news/update/${articleId}`);
    } else {
      file = req.files["file"][0].filename;
    }
  }

  try {
    if (!mongoose.isValidObjectId(articleId) || articleId === "") {
      res.redirect("/notFound");
    }
    // updated article field(s) by given id if validated
    let articleData = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      image: image,
      file: file,
      isFeatured: JSON.parse(true ? req.body.isFeatured !== undefined : false),
    };
    await Article.findByIdAndUpdate(articleId, articleData);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete an article by ID
const deleteArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    await Article.deleteOne({ _id: articleId });
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInsightArticles,
  getDashboardArticles,
  getArticleById,
  getFeaturedArticles,
  addArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
};
