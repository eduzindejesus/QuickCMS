const { validationResult } = require("express-validator");

exports.loginForm = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("login", { errors: errors.array() });
  }

  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.isLoggedIn = true;
    return res.redirect("/admin"); // Redireciona para o painel de administração
  } else {
    return res
      .status(401)
      .render("login", { errors: [{ msg: "Invalid credentials" }] });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
