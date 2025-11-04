const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); // importe seu app Express aqui
const postLogin = require('./fixture/requisicoes/login/postLogin.json');


describe(' Testes de Troca de Livro (POST /books/:id/exchange)', () => {
  let token;
  let bookId;

  //  Login e criação de um livro antes dos testes
  before(async () => {
    // Registra o usuário antes do login (ignora erro se já existe)
    await request(app)
      .post('/api/auth/register')
      .send(postLogin)
      .catch(() => {});

    // Faz login e obtém token JWT
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(postLogin)
      .expect(200);

    token = loginRes.body.token;
    expect(token).to.be.a('string');

    // Cria um livro para testar a troca
    const novoLivro = {
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      quantity: 3
    };

    const createRes = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send(novoLivro)
      .expect(201);

    bookId = createRes.body.id;
    expect(bookId).to.exist;
  });
  
  // Teste principal — troca com autenticação válida
  it('Deve permitir a troca de um livro (reduz quantidade em 1)', async () => {
    const res = await request(app)
      .post(`/api/books/${bookId}/exchange`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).to.have.property('message', 'exchange successful');
    expect(res.body).to.have.property('book');
    expect(res.body.book.quantity).to.equal(2); // 3 - 1
  });

  // Teste sem autenticação
  it('Deve retornar 401 se tentar trocar sem autenticação', async () => {
    const res = await request(app)
      .post(`/api/books/${bookId}/exchange`)
      .expect(401);

    expect(res.body).to.have.property('error');
  });

  // Teste livro inexistente
  it('Deve retornar 404 se o livro não existir', async () => {
    const res = await request(app)
      .post('/api/books/9999/exchange')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(res.body).to.have.property('error');
  });

  // Teste quantidade esgotada
  it('Deve retornar erro se a quantidade do livro for 0', async () => {
    // Reduz quantidade até zerar
    await request(app)
      .post(`/api/books/${bookId}/exchange`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app)
      .post(`/api/books/${bookId}/exchange`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const res = await request(app)
      .post(`/api/books/${bookId}/exchange`)
      .set('Authorization', `Bearer ${token}`)
      .expect(409);

    expect(res.body).to.have.property('error');
  });
});

