const express = require("express");
const router = express.Router();

// Rota para login
router.get("/login", (req, res) => {
  res.render("login");
});

// Rota para processar login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Verifique as credenciais aqui
  req.session.isLoggedIn = true;
  res.redirect("/");
});

// Rota para logout
router.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect("/");
});

module.exports = router;
