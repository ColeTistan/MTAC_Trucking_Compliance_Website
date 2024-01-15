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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// configure static files
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static("./public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/assets", express.static(__dirname + "public/assets"));

app.use(authRouter);
app.use(articleRouter);
app.use(viewsRouter);

// making connnection with our database
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     console.log("connected successfully...");
//   })
//   .catch((error) => {
//     console.error(`failed to connect to server ${error}`);
//   });

// Schema For User Auth
// const userSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { collection: "users" }
// );
// const User = mongoose.model("User", userSchema);

// app.post("/signup", async (req, res) => {
//   // geting our data from frontend
//   const { email, password: plainTextPassword } = req.body;
//   // encrypting our password to store in database
//   const password = await bcrypt.hash(plainTextPassword, salt);
//   try {
//     // storing our user data into database
//     const response = await User.create({
//       email,
//       password,
//     });
//     console.log(response);
//     return res.redirect("/");
//   } catch (error) {
//     console.log(JSON.stringify(error));
//     if (error.code === 11000) {
//       return res.send({ status: "error", error: "email already exists" });
//     }
//     throw error;
//   }
// });

// const verifyUserLogin = async (email, password) => {
//   try {
//     const user = await User.findOne({ email }).lean();
//     if (!user) {
//       return { status: "error", error: "user not found" };
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       // creating a JWT token
//       token = jwt.sign(
//         { id: user._id, username: user.email, type: "user" },
//         JWT_SECRET,
//         { expiresIn: "2h" }
//       );
//       return { status: "ok", data: token };
//     }
//     return { status: "error", error: "invalid password" };
//   } catch (error) {
//     console.log(error);
//     return { status: "error", error: "timed out" };
//   }
// };

// // login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   // we made a function to verify our user login
//   const response = await verifyUserLogin(email, password);
//   if (response.status === "ok") {
//     // storing our JWT web token as a cookie in our browser
//     res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
//     res.redirect("/");
//   } else {
//     res.json(response);
//   }
// });

// const verifyToken = (token) => {
//   try {
//     const verify = jwt.verify(token, JWT_SECRET);
//     if (verify.type === "user") {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log(JSON.stringify(error), "error");
//     return false;
//   }
// };

// // get requests
app.get("/", (req, res) => {
  const { verifyToken } = require("./controllers/authController");
  const { token } = req.cookies;
  console.log(token);
  if (verifyToken(token)) {
    return res.render("employee");
  } else {
    return res.render("index");
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
