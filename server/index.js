const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

// configure dotenv file
dotenv.config();
const port = process.env.PORT || 3000;

// configure express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(morgan("common"));

const articleRoutes = require("./routes/article");

app.use("/", articleRoutes);

app.listen(port, () => console.log(`listening on Port ${port}...`));
