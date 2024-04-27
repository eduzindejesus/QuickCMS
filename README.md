# QuickCMS

## Informações Gerais

- **Disciplina**: AS63A - Programação Web Back-end
- **Ano/Semestre**: 2024/1

## Integrantes do Grupo

- [Eduardo de Jesus](https://github.com/eduzindejesus)  

- [Guilherme Sebastião](https://github.com/guievbs)  


### Objetivo

O objetivo do trabalho é desenvolver um projeto de CMS simples, que atenda aos seguintes
requisitos

1. **Sistema de Login para o administrador de conteúdo**
   - O nome de usuário e senha são fixos e devem ser armazenados em um arquivo de configuração (.env)
   - Para controle de autenticação do usuário deve ser utilizado sessão
   - O sistema deve também incluir uma rota para logout

2. **Criação dinâmica de páginas**
   - Para criar uma página é necessário estar logado
   - O usuário deve especificar a URL e o conteúdo desejado (o conteúdo pode ter marcação HTML ou permitir outra linguagem de estilização como o Markdown)

3. **Edição do conteúdo de uma página**
   - Para editar uma página é necessário estar logado
   - O usuário poderá alterar o conteúdo de uma página, porém não poderá modificar a URL definida

4. **Exclusão de uma página**
   - Para excluir uma página é necessário estar logado
   - Ao excluir uma página, seu conteúdo e rota são excluídos permanentemente do sistema

5. **Página inicial do site**
   - Não é necessário estar logado
   - Lista todas as páginas criadas e disponibiliza links para acessar as mesmas

6. **Visualizador das páginas criadas**
   - Não é necessário estar logado
   - Acessa o conteúdo da página a partir da URL definida na criação da página

7. **Recurso extra**
   - Cada equipe deverá elaborar um recurso extra que tornará o seu CMS exclusivo
   - Exemplos: Customização visual, upload de imagens, comentários, classificação das páginas, múltiplos administradores, uso de tags nas páginas, categorias de páginas, etc.

Para adicionar instruções de instalação ao seu README, você pode seguir este modelo:

#### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/eduzindejesus/QuickCMS.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd QuickCMS  

3. **Execute o projeto:**
   ```bash
   npm start
   ```

4. **Acesse o QuickCMS no navegador:**
   - Abra seu navegador e vá para `http://localhost:3000` (ou outra porta, dependendo da configuração).

