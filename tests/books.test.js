const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); // Caminho para o app Express exportado

describe(' Testes de Cadastro de Livro com Autenticação', () => {
  let token;

  // Defina as credenciais de login do usuário de teste
  const postLogin = {
    email: 'usuario@teste.com',
    password: 'senha123'
  };

 //Testes
    // Register user before testing login and get token
    before(async () => {
      const testUser = { name: postLogin.email, password: postLogin.password };

      // Try to register (ignore conflict)
      await request(app).post('/api/auth/register').send(testUser).catch(() => {});

      // Login
      const loginResponse = await request(app).post('/api/auth/login').send(testUser);

  

    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body).to.have.property('token');
    token = loginResponse.body.token;
  
    });

  it('Deve cadastrar um livro com token JWT válido', async () => {
    const novoLivro = {
    title: 'O Hobbit',          // changed from titulo
    author: 'J.R.R. Tolkien',   // changed from autor
    quantity: 2                 // changed from quantidade
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
