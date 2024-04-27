const pageModel = require('../models/pageModel');

exports.createPage = (req, res) => {
    const { title, content, url } = req.body;
    
    // Verificar se todos os campos necessários foram fornecidos
    if (!title || !content || !url) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Criar a nova página
    const newPage = {
        title: title,
        content: content,
        url: url
    };

    // Salvar a nova página
    pageModel.savePage(newPage);

    // Responder com uma mensagem de sucesso
    res.status(201).json({ message: "Página criada com sucesso", page: newPage });
};


exports.listPages = (req, res) => {
    // Buscar todas as páginas no modelo de página
    const allPages = pageModel.getAllPages();
    
    // Renderizar a página inicial com a lista de páginas
    res.render('index', { pages: allPages });
};

exports.getPageByUrl = (req, res) => {
    const pageUrl = req.params.pageUrl;
    
    // Buscar a página no modelo de página
    const page = pageModel.getPageByUrl(pageUrl);
    
    if (!page) {
        return res.status(404).json({ error: "Página não encontrada" });
    }
    
    // Responder com os dados da página
    res.json({ page });
};


exports.getPage = (req, res) => {
    const pageUrl = req.params.pageUrl;
    
    // Buscar a página no modelo de página
    const page = pageModel.getPageByUrl(pageUrl);
    
    if (!page) {
        return res.status(404).json({ error: "Página não encontrada" });
    }
    
    // Responder com os dados da página encontrada
    res.json({ page });
};


exports.updatePage = (req, res) => {
    const pageUrl = req.params.pageUrl;
    const { title, content } = req.body;
    
    // Atualizar a página no modelo de página
    const updatedPage = pageModel.updatePage(pageUrl, { title, content });
    
    if (!updatedPage) {
        return res.status(404).json({ error: "Página não encontrada" });
    }
    
    // Responder com uma mensagem de sucesso
    res.json({ message: "Página atualizada com sucesso", page: updatedPage });
};


exports.deletePage = (req, res) => {
    const pageUrl = req.params.pageUrl;
    
    // Excluir a página no modelo de página
    const deletedPage = pageModel.deletePage(pageUrl);
    
    if (!deletedPage) {
        return res.status(404).json({ error: "Página não encontrada" });
    }
    
    // Responder com uma mensagem de sucesso
    res.json({ message: "Página excluída com sucesso" });
};


const dotenv = require('dotenv');
dotenv.config();

exports.loginPage = (req, res) => {
    // Renderizar a página de login
    res.render('login', { error: null }); // Passando um objeto vazio para não exibir nenhum erro inicialmente
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Credenciais corretas, iniciar sessão
    req.session.user = username;
    res.redirect('/dashboard'); // Redirecionar para a página do painel após o login
  } else {
    // Credenciais inválidas, exibir mensagem de erro
    res.render('login', { error: 'Credenciais inválidas' });
  }
};

exports.logout = (req, res) => {
  // Encerrar a sessão do usuário
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login'); // Redirecionar para a página de login após o logout
  });
};


exports.renderLoginPage = (req, res) => {
    res.render('login'); // Renderiza o arquivo 'login.ejs' na pasta 'views'
};
