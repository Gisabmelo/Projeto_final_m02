# API de Troca de Livros

Projeto simples para gerenciar a troca de livros entre leitores.

Principais funcionalidades:
- Registrar leitor (nome, senha)
- Login e autenticação via JWT
- Registrar livros (título, autor, quantidade)
- Buscar livros e ver quantidade disponível (requer autenticação)
- Solicitar troca (reduz quantidade em 1) (requer autenticação)
- Documentação Swagger disponível em `/docs`

Como executar

1. Instalar dependências:

```powershell
npm install
```

2. Iniciar servidor:

```powershell
npm start
```
2. Para rodar os testes:
npm  run test

Endpoints principais (base `/api`):
- `POST /api/auth/register` - registrar leitor
- `POST /api/auth/login` - fazer login e receber token JWT
- `POST /api/books` - registrar livro (requer Authorization: Bearer <token>)
- `GET /api/books` - buscar livros (requer token)
- `GET /api/books/{id}` - obter livro por id (requer token)
- `POST /api/books/{id}/exchange` - solicitar troca (requer token)

Swagger

A documentação OpenAPI está em `resources/swagger.json` e a UI está disponível em `/docs`.

http://localhost:3000/docs/#/

Notas de implementação

- Projeto usa armazenamento em memória (não persistente). Os dados são perdidos ao reiniciar.
- Autenticação é feita via JWT usando um segredo simples; para produção configure `JWT_SECRET`.
- Estrutura em camadas: routes, controllers, services, models, db, middleware.
