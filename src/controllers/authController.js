const dotenv = require("dotenv");
dotenv.config();

exports.loginPage = (req, res) => {
  res.render("login", { error: null });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.user = username;
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Credenciais inválidas" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
};
