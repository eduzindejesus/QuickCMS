const fs = require('fs');
const path = require('path');

const dataDirectory = path.join(__dirname, '../data'); // Diretório onde os arquivos de página serão armazenados

const savePage = (pageData) => {
    
    const filePath = path.join(dataDirectory, `${pageData.url}.json`);

   
    fs.writeFileSync(filePath, JSON.stringify(pageData));
};

const getPage = (pageUrl) => {

    const filePath = path.join(dataDirectory, `${pageUrl}.json`);

    try {
        // Leia os dados do arquivo JSON da página
        const pageData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(pageData);
    } catch (error) {
        // Se o arquivo não existir, retorne null
        return null;
    }
};

module.exports = {
    savePage,
    getPage,

};
