const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

exports.createPageForm = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }
  res.render("pageForm");
};

exports.createPage = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("pageForm", { errors: errors.array() });
  }

  const { url, content } = req.body;
  fs.writeFile(path.join("./pages", `${url}.txt`), content, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

exports.editPageForm = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  const { url } = req.params;
  fs.readFile(path.join("./pages", `${url}.txt`), "utf8", (err, data) => {
    if (err) throw err;
    res.render("pageForm", { url, content: data });
  });
};

exports.editPage = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  const { url } = req.params;
  const { content } = req.body;

  fs.writeFile(path.join("./pages", `${url}.txt`), content, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

exports.deletePage = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  const { url } = req.params;
  fs.unlink(path.join("./pages", `${url}.txt`), (err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

exports.viewPage = (req, res) => {
  const { url } = req.params;
  fs.readFile(path.join("./pages", `${url}.txt`), "utf8", (err, data) => {
    if (err) throw err;
    res.render("viewPage", { content: data });
  });
};
