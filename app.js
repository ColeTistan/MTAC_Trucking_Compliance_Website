// Import NPM packages
const express = require("express");
const cors = require("cors");
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

require("./connect");

// configure additional settings for app
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// configure static files
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static("./public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/assets", express.static(__dirname + "public/assets"));

app.use(authRouter);
app.use(articleRouter);
app.use(viewsRouter);

// // get requests
// app.get("/", (req, res) => {
//   const { verifyToken } = require("./controllers/authController");
//   console.log(token);
//   if (verifyToken(token)) {
//     res.render("employee");
//   } else {
//     res.render("index");
//   }
// });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
