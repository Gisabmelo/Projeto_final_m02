📘 **Projeto de Testes de API – Mocha, Chai e Supertest**

✅ 1. **Introdução**

Este repositório contém testes automatizados para a API de Troca de Livros. Os testes foram desenvolvidos utilizando JavaScript com as bibliotecas Mocha, Chai e Supertest, com o objetivo de validar os principais endpoints da aplicação e garantir a qualidade e funcionamento correto das funcionalidades implementadas.

🛠 2. Tecnologias Utilizadas

- **JavaScript**
- **Mocha** (framework de testes)
- **Chai** (biblioteca de asserções)
- **Supertest** (requisições HTTP para testes de API)
- **Node.js**
- **npm** (gerenciador de pacotes)

📂 3. **Estrutura do Repositório**
```
Projeto_final_m02/
├── src/
│   └── app.js                  # Arquivo principal da API
├── tests/
│   ├── login.test.js           # Testes de autenticação e login
│   ├── books.test.js           # Testes de cadastro de livros
│   └── SearchBooks.test.js     # Testes de Busca de livros
    ├── booksExchange.test.js   # Testes de troca de livros
│   ├── GetBookByid.test.js     # Testes de Busca de livros pelo ID

├── package.json                # Dependências e scripts do projeto
└── README.md                   # Documentação do repositório
```


⚙ 5. **Instalação do Projeto**

### 1. Clonar o repositório
```bash
git clone https://github.com/Gisabmelo/Projeto_final_m02
cd Projeto_final_m02
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar a API (se necessário)
```bash
node src/app.js
```
Ou com Nodemon:
```bash
npm run dev
```

### 4. Executar os testes com Mocha
```bash
npx mocha tests/**/*.test.js --exit
```

---

Se desejar visualizar os resultados com maior detalhamento, você pode adicionar o modo de relatório:
```bash
npx mocha tests/**/*.test.js --reporter spec --exit
```

---

