const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); // Caminho para o app Express exportado

describe('📘 Testes de Cadastro de Livro com Autenticação', () => {
  let token;

  before(async () => {
    // Registrar um leitor de teste (ignora conflito) e em seguida fazer login
    const testUser = { name: 'testbookuser', password: 'pass123' };

    // Tenta registrar; se já existir, ignora o erro
    await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .then(() => {})
      .catch(() => {});

    // Faz login e guarda o token JWT
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send(testUser)
      .expect(200);

    expect(loginResponse.body).to.have.property('token');
    token = loginResponse.body.token;
  });

  it.only('Deve cadastrar um livro com token JWT válido', async () => {
    const novoLivro = {
      title: 'A Menina que Roubava Livros',
      author: 'Markus Zusak',
      quantity: 5
    };

    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`) // adiciona o token JWT
      .send(novoLivro)
      .expect('Content-Type', /json/)
      .expect(201);

  expect(res.body).to.have.property('id');
  expect(res.body.title).to.equal(novoLivro.title);
  expect(res.body.author).to.equal(novoLivro.author);
  expect(res.body.quantity).to.equal(novoLivro.quantity);
  });

  it('Deve retornar erro ao tentar cadastrar sem token', async () => {
    const livroSemToken = {
      titulo: 'Sem Token',
      autor: 'Anônimo',
      quantidade: 1
    };

    const res = await request(app)
      .post('/api/books')
      .send(livroSemToken)
      .expect(401);

    expect(res.body).to.have.property('error');
  });
});
