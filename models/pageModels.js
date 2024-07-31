// model/pageModel.js

const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "../pages");

// Função para criar uma nova página
const createPage = (url, content, callback) => {
  const filePath = path.join(pagesDir, `${url}.txt`);
  if (fs.existsSync(filePath)) {
    return callback(new Error("Page already exists"));
  }
  fs.writeFile(filePath, content, callback);
};

// Função para ler uma página
const readPage = (url, callback) => {
  const filePath = path.join(pagesDir, `${url}.txt`);
  if (!fs.existsSync(filePath)) {
    return callback(new Error("Page not found"));
  }
  fs.readFile(filePath, "utf8", callback);
};

// Função para atualizar uma página
const updatePage = (url, content, callback) => {
  const filePath = path.join(pagesDir, `${url}.txt`);
  if (!fs.existsSync(filePath)) {
    return callback(new Error("Page not found"));
  }
  fs.writeFile(filePath, content, callback);
};

// Função para deletar uma página
const deletePage = (url, callback) => {
  const filePath = path.join(pagesDir, `${url}.txt`);
  if (!fs.existsSync(filePath)) {
    return callback(new Error("Page not found"));
  }
  fs.unlink(filePath, callback);
};

module.exports = {
  createPage,
  readPage,
  updatePage,
  deletePage,
};
