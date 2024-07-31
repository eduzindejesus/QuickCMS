const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "public/uploads/" });

const pagesDir = path.join(__dirname, "../pages");
const uploadsDir = path.join(__dirname, "../public/uploads");

// Rota para mostrar o formulário de criação
router.get("/create", (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  res.render("createPage");
});

// Rota para processar o formulário de criação
router.post("/create", upload.single("image"), (req, res) => {
  const { url, name, releaseDate, genre, price } = req.body;
  const filePath = path.join(pagesDir, `${url}.txt`);

  if (fs.existsSync(filePath)) {
    return res.status(400).send("Page already exists");
  }

  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
  const content = `Name: ${name}\nRelease Date: ${releaseDate}\nGenre: ${genre}\nPrice: ${price}\nImage: ${imagePath}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).send("Error creating page");
    res.redirect("/");
  });
});

// Rota para mostrar o formulário de edição
router.get("/edit/:url", (req, res) => {
  const { url } = req.params;
  const filePath = path.join(pagesDir, `${url}.txt`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Page not found");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");

    // Extrair os campos do conteúdo
    const [name, releaseDate, genre, price, image] = data
      .split("\n")
      .map((line) => line.split(": ")[1]);

    // Passar os dados para o template
    res.render("editPage", {
      url,
      name,
      releaseDate,
      genre,
      price,
      image, // Adicione a imagem para o formulário de edição
    });
  });
});

// Rota para atualizar uma página
router.post("/edit/:url", upload.single("image"), (req, res) => {
  const { url } = req.params;
  const { name, releaseDate, genre, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Caminho da imagem

  const filePath = path.join(pagesDir, `${url}.txt`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Page not found");
  }

  const content = `Name: ${name}\nRelease Date: ${releaseDate}\nGenre: ${genre}\nPrice: ${price}\nImage: ${imagePath}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).send("Error updating page");
    res.redirect("/");
  });
});

// Rota para excluir uma página
router.get("/delete/:url", (req, res) => {
  const { url } = req.params;
  const filePath = path.join(pagesDir, `${url}.txt`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Page not found");
  }

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Error deleting page");
    res.redirect("/");
  });
});

// Rota para listar as páginas
router.get("/", (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  fs.readdir(pagesDir, (err, files) => {
    if (err) return res.status(500).send("Error reading pages directory");

    const pages = files
      .filter((file) => file.endsWith(".txt"))
      .map((file) => file.replace(".txt", ""));

    res.render("admin", { pages });
  });
});

// Rota para visualizar uma página específica
router.get("/:url", (req, res) => {
  const { url } = req.params;
  const filePath = path.join(pagesDir, `${url}.txt`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Page not found");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");

    // Extrair os campos do conteúdo
    const [name, releaseDate, genre, price, image] = data
      .split("\n")
      .map((line) => line.split(": ")[1]);

    // Renderizar a página com o conteúdo extraído
    res.render("viewPage", {
      name,
      releaseDate,
      genre,
      price,
      url,
      content: data, // Para o viewPage.mustache
      image, // Adicionar a imagem para visualização
      isLoggedIn: req.session.isLoggedIn,
    });
  });
});

module.exports = router;
