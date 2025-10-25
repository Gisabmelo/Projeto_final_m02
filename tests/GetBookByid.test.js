
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); // caminho para o app principal (Express)
const postLogin = require('./fixture/requisicoes/login/postLogin.json');

describe(' Testes de Obtenção de Livro por ID (com autenticação)', () => {
  let token;
  let livroId;

  // Antes de todos os testes, registra usuário, faz login e obtém o token
  before(async () => {
    // Registra o usuário (ignora erro se já existir)
    await request(app)
      .post('/api/auth/register')
      .send(postLogin)
      .catch(() => {});

    // Tenta fazer login
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send(postLogin);

    console.log('\n[DEBUG] Login response:', loginResponse.body);
    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body).to.have.property('token');
    token = loginResponse.body.token;

    // Cria um livro para testar o GET depois
    const novoLivro = {
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      quantity: 2
    };

    const livroResponse = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send(novoLivro)
      .expect(201);

    expect(livroResponse.body).to.have.property('id');
    livroId = livroResponse.body.id;
  });

  // Teste principal: obter livro por ID com token válido
  it('Deve obter um livro pelo ID quando autenticado', async () => {
    const res = await request(app)
      .get(`/api/books/${livroId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).to.have.property('id', livroId);
    expect(res.body).to.have.property('title', 'O Hobbit');
    expect(res.body).to.have.property('author', 'J.R.R. Tolkien');
  });

  // Teste de acesso sem token
  it('Deve retornar erro 401 ao tentar obter um livro sem autenticação', async () => {
    const res = await request(app)
      .get(`/api/books/${livroId}`)
      .expect(401);

    expect(res.body).to.have.property('error');
  });

  // Teste de livro inexistente
  it('Deve retornar 404 ao buscar um livro inexistente', async () => {
    const res = await request(app)
      .get(`/api/books/9999`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(res.body).to.have.property('error');
  });
});
