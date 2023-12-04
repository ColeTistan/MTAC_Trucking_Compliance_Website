const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

// configure dotenv file
dotenv.config();
const port = process.env.PORT || 3000;

// configure express app and middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(morgan("common"));

// import and setup routes
const baseRoute = "/api";
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use(baseRoute, articleRoutes);
app.use(baseRoute, userRoutes);
app.use(baseRoute, authRoutes);

app.listen(port, () => console.log(`listening on Port ${port}...`));
