// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

// configure express app and middleware
const app = express()
const port = process.env.PORT || 3000;

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/assets', express.static(__dirname + 'public/assets'))

// Set Views
app.set('views', 'views')
app.set('view engine', 'ejs')

// configure dotenv file
dotenv.config();

// configure express app and middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet({contentSecurityPolicy: false}));

app.use(morgan("common"));

// import and setup routes
const baseRoute = "/api";
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const viewRoutes = require("./routes/views");

app.use(baseRoute, articleRoutes);
app.use(baseRoute, userRoutes);
app.use(baseRoute, authRoutes);
app.use(viewRoutes);

// Listen to available port
app.listen(port, () => console.log(`listening on Port ${port}...`));