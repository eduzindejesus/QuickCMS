const express = require("express");
const bodyParser = require("body-parser");
const pageRoutes = require("./src/routes/pageRoutes");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.get("/", (req, res) => {
  res.render("index");
});
app.set("view engine", "ejs"); // Definindo EJS
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/pages", pageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
