const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const pageRoutes = require("./src/routes/pageRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { isAuthenticated } = require("./src/middleware/authMiddleware");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/pages", isAuthenticated, pageRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
