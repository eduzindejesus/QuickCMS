const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

// Rotas
router.get("/login", pageController.renderLoginPage); // Rota para página de login
router.post("/login", pageController.login); // Rota para processo de login (POST)
router.get("/logout", pageController.logout); // Rota para processo de logout

router.get("/", pageController.listPages); // Listar todas as páginas
router.post("/", pageController.createPage); // Criar uma nova página
router.get("/:pageUrl", pageController.getPageByUrl); // Obter uma página por URL
router.put("/:pageUrl", pageController.updatePage); // Atualizar o conteúdo de uma página
router.delete("/:pageUrl", pageController.deletePage); // Excluir uma página

module.exports = router;
