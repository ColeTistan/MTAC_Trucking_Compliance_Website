// Import NPM packages
const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const path = require("path");

const viewsRouter = require("./routes/views");
const authRouter = require("./routes/auth");
const articleRouter = require("./routes/article");

// configure dotenv file
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

let cookieParser = require("cookie-parser");

// connect to mongoDB database.
const connectDB = require("./connect");
connectDB();

// configure additional settings for app
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// configure packages to handle middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(methodOverride("_method"));

// configure static files
app.use(express.static(__dirname + "/public"));
app.use("/image", express.static("./uploads/img"))
app.use("/pdf", express.static("./uploads/pdf"))
app.use("/css", express.static("./public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/assets", express.static(__dirname + "public/assets"));

// use api and view routes
app.use(authRouter);
app.use(articleRouter);
app.use(viewsRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
