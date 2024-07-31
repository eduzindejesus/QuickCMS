const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Cria o diretório 'pages' se ele não existir
const pagesDir = path.join(__dirname, "pages");
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir);
}

dotenv.config();

const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");

app.use("/auth", authRoutes);
app.use("/pages", pageRoutes);

app.get("/", (req, res) => {
  fs.readdir("./pages", (err, files) => {
    if (err) throw err;
    const pages = files.map((file) => file.replace(".txt", ""));
    res.render("index", { pages, isLoggedIn: req.session.isLoggedIn });
  });
});

app.get("/admin", (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  fs.readdir("./pages", (err, files) => {
    if (err) throw err;
    const pages = files.map((file) => file.replace(".txt", ""));
    res.render("admin", { pages });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
